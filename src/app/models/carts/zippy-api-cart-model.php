<?php

/**
 * API Args Handler
 *
 * @package Shin
 */

namespace ZIPPY_WASH\Src\App\Models\Carts;

defined('ABSPATH') or die();

use WP_REST_Response;
use ZIPPY_WASH\App\Models\Zippy_Request_Validation;

class Zippy_Api_Cart_Model
{
  public static function get_add_to_cart_args()
  {
      return array(
          'products' => array(
              'required' => true,
              'validate_callback' => function ($param) {
                  if (!is_array($param)) return false;

                  foreach ($param as $p) {
                      if (!isset($p['id']) || !isset($p['qty'])) return false;
                      if (!is_numeric($p['id']) || !is_numeric($p['qty'])) return false;
                  }

                  return true;
              },
          ),
      );
  }
}
