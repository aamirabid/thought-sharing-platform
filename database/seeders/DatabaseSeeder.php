<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();
        \App\Models\Tags::factory(10)->create();
        \App\Models\Notes::factory(10)->create();
        \App\Models\NoteTags::factory(100)->create();
    }
}