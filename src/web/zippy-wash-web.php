<?php

/**
 * Bookings FontEnd Form
 *
 *
 */

namespace ZIPPY_WASH\Src\Web;

defined('ABSPATH') or die();

use ZIPPY_WASH\Utils\Zippy_Utils_Core;
use DateTime;

class ZIPPY_WASH_Web
{
  protected static $_instance = null;

  /**
   * @return ZIPPY_WASH_Web
   */

  public static function get_instance()
  {
    if (is_null(self::$_instance)) {
      self::$_instance = new self();
    }
    return self::$_instance;
  }

  public function __construct()
  {
    /* Set timezone SG */
    date_default_timezone_set('Asia/Singapore');

    /* Init Function */

    /* Booking Assets  */
    add_action('wp_enqueue_scripts', array($this, 'booking_assets'));
    add_shortcode('shop-page', array($this, 'shop_page_shortcode'));
  }

  public function function_init(){
    return;
  }


  public function booking_assets()
  {
    // if (!is_archive() && !is_single() && !is_checkout()) return;
    $version = time();

    $current_user_id = get_current_user_id();
    $user_info = get_userdata($current_user_id);
    // Form Assets
    wp_enqueue_script('booking-js', ZIPPY_WASH_URL . '/assets/dist/js/web.min.js', [], $version, true);
    wp_enqueue_style('booking-css', ZIPPY_WASH_URL . '/assets/dist/css/web.min.css', [], $version);
    wp_localize_script('booking-js', 'admin_data', array(
      'userID' => $current_user_id,
      'user_email' => $user_info->user_email,
      'nonce' => wp_create_nonce('wp_rest'),
    ));
  }

  public function zippy_form($atts)
  {
    return '<div id="zippy-form"></div>';
  }

  public function shop_page_shortcode() {
      return '<div id="shop_page"></div>';
  }
}
