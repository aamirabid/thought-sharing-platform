<?php

namespace Database\Factories;

use App\Models\Notes;
use App\Models\Tags;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NoteTags>
 */
class NoteTagsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tag_id' => Tags::inRandomOrder()->first(),
            'note_id' => Notes::inRandomOrder()->first(),
        ];
    }
}