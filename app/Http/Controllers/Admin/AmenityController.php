<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use App\Http\Resources\AmenityResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmenityController extends Controller
{

    private function getAvailableIcons()
    {
        return [
            'WifiIcon', 'TvIcon', 'UsersIcon', 'SunIcon', 'ShieldCheckIcon', 'Battery100Icon',
            'AdjustmentsVerticalIcon', 'ArchiveBoxIcon', 'ArrowLeftEndOnRectangleIcon',
            'ArrowLeftStartOnRectangleIcon', 'BanknotesIcon', 'BellAlertIcon', 'BookOpenIcon',
            'BuildingLibraryIcon', 'BuildingOffice2Icon', 'CalendarIcon', 'CameraIcon',
            'ChatBubbleLeftIcon', 'CheckIcon', 'CloudIcon', 'ClockIcon', 'ComputerDesktopIcon',
            'DocumentIcon', 'EyeIcon', 'FingerPrintIcon', 'FilmIcon', 'FaceSmileIcon',
            'ExclamationCircleIcon', 'FireIcon', 'FlagIcon', 'GiftIcon', 'GlobeAltIcon',
            'HeartIcon', 'HomeModernIcon', 'IdentificationIcon', 'KeyIcon', 'LifebuoyIcon',
            'LightBulbIcon', 'LockClosedIcon', 'LockOpenIcon', 'MapIcon', 'MicrophoneIcon',
            'MusicalNoteIcon', 'NewspaperIcon', 'PhoneIcon', 'PhotoIcon', 'PlayIcon',
            'PrinterIcon', 'RadioIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'TruckIcon', 'WrenchIcon',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Amenities/Index', [
            'amenities' => AmenityResource::collection(Amenity::latest()->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Amenities/Create', [
            'icons' => $this->getAvailableIcons(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:amenities,name',
            'icon' => 'required|string|in:' . implode(',', $this->getAvailableIcons()),
        ]);

        Amenity::create($request->all());

        return redirect()->route('admin.amenities.index')->with('success', 'Comodidad creada exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amenity $amenity)
    {
        return Inertia::render('Admin/Amenities/Edit', [
            'amenity' => new AmenityResource($amenity),
            'icons' => $this->getAvailableIcons(),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Amenity $amenity)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:amenities,name,' . $amenity->id,
            'icon' => 'required|string|in:' . implode(',', $this->getAvailableIcons()),
        ]);

        $amenity->update($request->all());

        return redirect()->route('admin.amenities.index')->with('success', 'Comodidad actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amenity $amenity)
    {
        if ($amenity->hotels()->count() > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar una comodidad que está en uso.');
        }
        $amenity->delete();
        return redirect()->route('admin.amenities.index')->with('success', 'Comodidad eliminada exitosamente.');
    }
}
