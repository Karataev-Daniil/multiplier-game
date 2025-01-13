<?php
/*
Plugin Name: Multiplier Game
Description: Multiplier is a test-assignment game where players solve multiplication problems with interactive feedback and animations.
Version: 0.1
Author: Daniil Karataev
*/

function multiplier_game_get_file_version($file_path) {
    $file = plugin_dir_path(__FILE__) . $file_path;
    return file_exists($file) ? filemtime($file) : '1.0.0';
}

function multiplier_game_enqueue_scripts() {
    if (is_page_template('template/multiplier-game.php')) {
        wp_enqueue_style('reset',                get_template_directory_uri() . '/css/reset.css', array(), multiplier_game_get_file_version('/css/reset.css'));
        wp_enqueue_style('custom-fonts',         get_template_directory_uri() . '/css/fonts.css', array(), multiplier_game_get_file_version('/css/fonts.css'));

        wp_enqueue_style('multiplier-game-style',   plugins_url('/style.css', __FILE__),          array(), multiplier_game_get_file_version('style.css'));
        wp_enqueue_style('game-menu-style',      plugins_url('css/game.css', __FILE__),           array(), multiplier_game_get_file_version('css/game-menu.css'));

        wp_enqueue_script('multiplier-game-script', plugins_url('js/game.js', __FILE__),          array('jquery'), multiplier_game_get_file_version('script.js'), true);
    }
}
add_action('wp_enqueue_scripts', 'multiplier_game_enqueue_scripts');


function multiplier_game_shortcode() {
    ob_start(); ?>
        <div class="game-container">
            <div class="gamebar">
                <h3>Examples</h3>
                <div class="current" id="currentExample">Current: 2 × 1 = ?</div>
                <div class="next" id="nextExample">Next: 2 × 2 = ?</div>
                <div class="progress-bar" id="progressBar">
                    <button id="prevExample">Previous</button>
                    <button id="nextExampleBtn">Next</button>
                </div>
            </div>
            <div class="game">
                <div class="example" id="example">2 × 1 = ?</div>
                <div class="input-container">
                    <input type="number" id="answer" placeholder="Enter your answer">
                    <button id="submit" disabled>Check</button>
                </div>
                <div class="block-container" id="cubeContainer"></div>
                <button id="hintButton">Get Hint</button>
            </div>
        </div>
    <?php return ob_get_clean();
}
add_shortcode('multiplier_game', 'multiplier_game_shortcode');

?>