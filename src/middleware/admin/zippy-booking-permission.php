<?php

/**
 * Bookings Router
 *
 *
 */

namespace ZIPPY_WASH\Src\Middleware\Admin;


defined('ABSPATH') or die();

use ZIPPY_WASH\Src\App\Zippy_Response_Handler;

class ZIPPY_WASH_Permission
{
    protected static $_instance = null;

    /**
     * @return ZIPPY_WASH_Permission
     */

    public static function get_instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public static function zippy_permission_callback()
    {
        $headers = getallheaders();

        
        $uppercase_headers = [];
        foreach ($headers as $key => $value) {
            $uppercase_headers[ucfirst($key)] = $value;
        }

        $token = isset($uppercase_headers['Authorization']) ? trim(str_replace('Bearer', '', $uppercase_headers['Authorization'])) : '';
        $valid_token = get_option(ZIPPY_BOOKING_API_TOKEN_NAME);

        // Valid Token
        return $token === $valid_token;
    }
}
