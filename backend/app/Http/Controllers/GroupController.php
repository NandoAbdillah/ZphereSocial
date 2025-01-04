<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Resources\GroupResource;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupMemberResource;
use App\Models\GroupMember;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function searchGroup(Request $request)
    {
        $search = $request->input('search', '');
        $groupsQuery = Group::query();

        if ($search) {
            $groupsQuery->where('name', 'like', '%' . $search . '%')->with('user')->withCount('posts');
        }

        $groups = $groupsQuery->orderBy('members')->withCount('posts')->paginate(4); // Ganti 10 dengan jumlah item per halaman yang diinginkan

        return GroupResource::collection($groups);
    }

    public function index(Request $request)
    {
        $groupsQuery = Group::query();
        $groups = $groupsQuery->orderBy('members')->with('user')->withCount('posts')
            ->paginate(6);

        return GroupResource::collection($groups)
            ->additional([
                'meta' => [
                    'current_page' => $groups->currentPage(),
                    'last_page' => $groups->lastPage(),
                    'per_page' => $groups->perPage(),
                    'total' => $groups->total(),
                ]
            ]);
    }

    public function suggest(Request $request)
    {
        // Mendapatkan grup yang memiliki anggota minimal 2 dan memuat relasi dengan user
        $suggestedGroups = Group::where('members', '>=', 2)->with('user')->get();
    
        // Mendapatkan id grup yang sudah difilter
        $unfollowedGroups = $suggestedGroups->filter(function ($group) {
            // Memeriksa apakah user belum mengikuti grup
            return !GroupMember::where('group_id', $group->id)
                               ->where('user_id', auth()->id())
                               ->exists();
        });
    
        // Mengembalikan grup yang belum diikuti dalam bentuk resource collection
        return GroupResource::collection($unfollowedGroups);
    }
    

    public function profile(Request $request)
    {
        $uuid = $request->uuid;

        $user = Group::where('uuid', $uuid)
            ->with(['user'])
            ->with(['posts' => function ($query) {
                $query->with(['user', 'media', 'commentss'])
                    ->orderBy('created_at', 'desc'); // Urutkan berdasarkan tanggal dibuat secara descending
            }])
            ->firstOrFail();

        // Kembalikan data pengguna sebagai UserResource
        return new GroupResource($user);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGroupRequest $request)
    {
        $data = $request->validated();
        $thumbnail  = $data['thumbnail']->store("groups", "public");
        $icon = $data['icon']->store("groups", "public");

        try {
            $group =  Group::create([
                "uuid" => Str::uuid(),
                "user_id" => auth()->id(),
                "icon" => $icon,
                "thumbnail" => $thumbnail,
                "description" => $data['description'],
                "name" => $data['name'],
                "location" => $data['location'],
                "type" => $data['type'],

            ]);

            GroupMember::create([
                "user_id" => auth()->id(),
                "group_id" => $group->id,
            ]);

            $group->members += 1;
            $group->save();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function editGroup(Request $request)
    {
        $id = $request->id;

        $item = Group::where([
            'user_id' => auth()->id(),
            'id' => $id,
        ])->get();

        if ($item->isNotEmpty()) {
            return GroupResource::collection($item);
        } else {
            return response()->json([
                'message' => 'Access Denied !'
            ], 500);
        }
    }

    public function updateGroup(UpdateGroupRequest $request)
    {
        $data = $request->validated();
        $id = $request->id;

        $group = Group::find($id);

        if ($group) {
            $group->name = $data['name'];
            $group->location = $data['location'];
            $group->type = $data['type'];
            $group->description = $data['description'];

            if (isset($data['icon'])) {
                $icon = $data['icon']->store("groups", "public");
                $group->icon = $icon;
            }
            if (isset($data['thumbnail'])) {
                $thumbnail  = $data['thumbnail']->store("groups", "public");
                $group->thumbnail = $thumbnail;
            }

            $group->save();
        } else {
            return response()->json(['message' => 'Tidak ada group ditemukan'], 500);
        }
    }

    public function groupMember(Request $request)
    {
        $groupId = Group::where('uuid', $request->uuid)->pluck('id')->first();
        $groupMembers = GroupMember::where('group_id', $groupId)->with('user')->get();

        return response()->json([
            'message' => 'Successfully get group members',
            'data' => $groupMembers,
        ]);
    }
}
