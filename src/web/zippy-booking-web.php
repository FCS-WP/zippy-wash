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
    // add_action('init', array($this, 'function_init'));
    add_action('wp_head', array($this, 'zippy_lightbox_flatsome'));

    /* Short Code Take Away Function */
    add_shortcode('form_take_away', array($this, 'form_take_away'));

    /* Short Code Delivery Function */
    add_shortcode('form_delivery', array($this, 'form_delivery'));

    add_shortcode('zippy_form', array($this, 'zippy_form'));

    
    add_shortcode('pickup_date_calander', array($this, 'pickup_date_calander_callback'));

    /* Booking Assets  */
    add_action('wp_enqueue_scripts', array($this, 'booking_assets'));
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
      'user_email' => $user_info->user_email
    ));
  }

  public function zippy_form($atts) 
  {
    return '<div id="zippy-form"></div>'; 
  }
}
