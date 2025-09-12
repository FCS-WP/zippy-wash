<?php
/*
Plugin Name: Zippy Wash
Plugin URI: https://zippy.sg/
Description: Zippy Wast is a smart, EPOS-connected Customer Relationship Management plugin for Woocommerce that lets you sync customer allowing you to sync customer data, manage credit points and place orders directly through your site.
Version: 1.0
Author: Zippy SG
Author URI: https://zippy.sg/
License: GNU General Public
License v3.0 License
URI: https://zippy.sg/
Domain Path: /languages

Copyright 2024

*/

namespace ZIPPY_WASH;


defined('ABSPATH') or die('°_°’');

/* ------------------------------------------
 // Constants
 ------------------------------------------------------------------------ */
/* Set plugin version constant. */

if (!defined('ZIPPY_WASH_VERSION')) {
  define('ZIPPY_WASH_VERSION', '4.0');
}

/* Set plugin name. */

if (!defined('ZIPPY_WASH_NAME')) {
  define('ZIPPY_WASH_NAME', 'ZIPPY WASH');
}

if (!defined('ZIPPY_WASH_PREFIX')) {
  define('ZIPPY_WASH_PREFIX', 'ZIPPY_WASH');
}

if (!defined('ZIPPY_WASH_BASENAME')) {
  define('ZIPPY_WASH_BASENAME', plugin_basename(__FILE__));
}

/* Set constant path to the plugin directory. */

if (!defined('ZIPPY_WASH_DIR_PATH')) {
  define('ZIPPY_WASH_DIR_PATH', plugin_dir_path(__FILE__));
}

/* Set constant url to the plugin directory. */

if (!defined('ZIPPY_WASH_URL')) {
  define('ZIPPY_WASH_URL', plugin_dir_url(__FILE__));
}

/* Set constant enpoint to the plugin directory. */
if (!defined('ZIPPY_WASH_API_NAMESPACE')) {
  define('ZIPPY_WASH_API_NAMESPACE', 'zippy-wash/v1');
}

foreach (glob(ZIPPY_WASH_DIR_PATH . "/includes/*.php") as $file_name) {
    require_once ( $file_name );
}

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

/* ------------------------------------------
// Includes
 --------------------------- --------------------------------------------- */
require ZIPPY_WASH_DIR_PATH . '/includes/autoload.php';

use  ZIPPY_WASH\Src\Admin\Settings;
use ZIPPY_WASH\Src\Routers\ZIPPY_WASH_Ajax;
use ZIPPY_WASH\Src\Routers\ZIPPY_WASH_Routers;
use ZIPPY_WASH\Src\Web\ZIPPY_WASH_Web;

/**
 *
 * Init Zippy Booking
 */

 Settings::get_instance();

 ZIPPY_WASH_Routers::get_instance();

 ZIPPY_WASH_Web::get_instance();
 ZIPPY_WASH_Ajax::get_instance();


