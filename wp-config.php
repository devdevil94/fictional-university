<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'WP');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '2hY0Ir++yuYQI|AI}Pup%f=0|.^rGPL$D(vy^u!P7<suWcu2(2w+W7*s*W`6-HjG');
define('SECURE_AUTH_KEY',  '@P? ?qHUUmY-D.C][3+-D&7p6r3O9E6~yC[mkP!QG[@>KsG{6[Dv$B!]ZH28!qF1');
define('LOGGED_IN_KEY',    'OAT^K_Yoejj(DLG&iX1?-nJ[2xApG]Zj2{tviIEE`mWJAVu$ :T|znE ~+,]2tUs');
define('NONCE_KEY',        '*.G1M`s.fS8ec(?Dl0~G>0DGS<$mH:W|{  qW(dtNthn|Mhe<N]BKW_f7A[N,t~X');
define('AUTH_SALT',        ']5Uoae4,U@m=zt3J7~mX{k9R#%(m@Hq]]E7&[RDexx=SYs@8tk1EN8HPGd.* CB7');
define('SECURE_AUTH_SALT', 'v0Y:N7wU&M&^[[5cy3],u(h*|syFqI#fgKt23(g_K{(wH_{T&ds]H^->1,mHxX U');
define('LOGGED_IN_SALT',   '4VjFPkx-cL%mezeFl;n-LN5*Q2&5e(O/ Av5.Xu&-x~JiIV2ia@n#h9m=/#WP2$b');
define('NONCE_SALT',       'F~EY__`NMj4Q:l<>R$/%%{H^ZM5:FH2v)k1@7}HucG&%E&U(`@TLwuKHG9/HzBh}');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
