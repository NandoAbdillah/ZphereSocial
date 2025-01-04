<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use App\Http\Requests\StoreGroupMemberRequest;
use App\Http\Requests\UpdateGroupMemberRequest;

class GroupMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    public function joinGroup($group_id)
    {
        // Logika untuk join group
        $user = auth()->id();
        $group = Group::findOrFail($group_id);

        try {
            GroupMember::create([
                "user_id" => $user,
                "group_id" => $group_id,

            ]);

            $group->members += 1;
            $group->save();
        } catch (\Throwable $th) {

            throw $th;
        }
         

        return response()->json(['message' => 'Successfully joined the group'], 200);
    }

    public function getGroupStatus($group_id)
    {

        $group = GroupMember::where([
            "user_id" => auth()->id(),
            "group_id" => $group_id,
        ])->first();

        $status = null;

        if ($group) {
            $status = "hasJoin";
        }

        return response()->json(['status' => $status]);
    }

    public function leaveGroup($group_id)
    {
        $group = Group::findOrFail($group_id);

        try {
            $like = GroupMember::where([
                "user_id" => auth()->id(),
                "group_id" => $group_id,
            ])->first();

            $group->members -=1;
            $group->save();

            $like->delete();
        } catch (\Throwable $th) {

            throw $th;
        }

        return response()->json(['message' => 'Successfully left the group'], 200);
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
    public function store(StoreGroupMemberRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(GroupMember $groupMember)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GroupMember $groupMember)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupMemberRequest $request, GroupMember $groupMember)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupMember $groupMember)
    {
        //
    }
}
