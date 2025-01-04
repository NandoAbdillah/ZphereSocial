<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getProvinces()
    {
        $path = storage_path('app/location/provinces.json'); // Path ke file JSON provinces
        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $json = file_get_contents($path);
        return response()->json(json_decode($json, true));
    }

    public function getRegencies()
    {
        $path = storage_path('app/location/regencies.json'); // Path ke file JSON regencies
        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $json = file_get_contents($path);
        return response()->json(json_decode($json, true));
    }

    public function getDistricts()
    {
        $path = storage_path('app/location/districts.json'); // Path ke file JSON regencies
        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $json = file_get_contents($path);
        return response()->json(json_decode($json, true));
    }

    public function getVillages()
    {
        $path = storage_path('app/location/villages.json'); // Path ke file JSON regencies
        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $json = file_get_contents($path);
        return response()->json(json_decode($json, true));
    }
}
