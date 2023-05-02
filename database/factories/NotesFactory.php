<?php

namespace Database\Factories;

use App\Models\Notes;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notes>
 */
class NotesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->safeColorName();
        return [
            'user_id' => User::inRandomOrder()->first(),
            'slug' => Notes::createSlug($title),
            'title' => $title,
            'body' => fake()->text(),
            'is_published' => 1
        ];
    }
}
