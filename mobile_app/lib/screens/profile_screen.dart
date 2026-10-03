import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/auth_service.dart';
import 'auth_screen.dart';
import '../main.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String _userName = 'User';
  String _userEmail = '';

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    final name = await AuthService.getUserName();
    final email = await AuthService.getUserEmail();
    if (mounted) setState(() { _userName = name; _userEmail = email; });
  }

  Future<void> _logout() async {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final confirm = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: colorScheme.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text('Logout', style: TextStyle(color: colorScheme.onSurface, fontWeight: FontWeight.w700)),
        content: Text('Are you sure you want to logout?', style: TextStyle(color: colorScheme.onSurface.withValues(alpha: 0.7))),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text('Cancel', style: TextStyle(color: colorScheme.onSurface.withValues(alpha: 0.54))),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(
              backgroundColor: colorScheme.error,
              foregroundColor: colorScheme.onError,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: const Text('Logout'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      await AuthService.logout();
      if (!mounted) return;
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const AuthScreen()),
        (_) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios_new_rounded, color: colorScheme.onSurface, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Profile',
          style: TextStyle(color: colorScheme.onSurface, fontWeight: FontWeight.w700),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const SizedBox(height: 16),

            // Profile card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    colorScheme.primary.withValues(alpha: 0.8),
                    colorScheme.primary,
                  ],
                ),
                boxShadow: [
                  BoxShadow(
                    color: colorScheme.primary.withValues(alpha: 0.2),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Column(
                children: [
                  // Avatar
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: colorScheme.onPrimary.withValues(alpha: 0.15),
                      border: Border.all(color: colorScheme.onPrimary.withValues(alpha: 0.24), width: 2),
                    ),
                    child: Center(
                      child: Text(
                        _userName.isNotEmpty ? _userName[0].toUpperCase() : 'U',
                        style: TextStyle(
                          color: colorScheme.onPrimary,
                          fontSize: 34,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    _userName,
                    style: TextStyle(
                      color: colorScheme.onPrimary,
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _userEmail,
                    style: TextStyle(color: colorScheme.onPrimary.withValues(alpha: 0.6), fontSize: 14),
                  ),
                  const SizedBox(height: 20),
                  // Stats row
                  Row(
                    children: [
                      _buildStat('12', 'Total Scans', colorScheme),
                      _buildStatDivider(colorScheme),
                      _buildStat('11', 'Authentic', colorScheme),
                      _buildStatDivider(colorScheme),
                      _buildStat('1', 'Flagged', colorScheme),
                    ],
                  ),
                ],
              ),
            )
                .animate()
                .fadeIn(duration: 500.ms)
                .slideY(begin: 0.2, end: 0),

            const SizedBox(height: 32),

            // Menu items
            ...[
              _MenuItem(
                icon: isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
                iconColor: colorScheme.secondary,
                title: isDark ? 'Light Theme' : 'Dark Theme',
                subtitle: 'Toggle app appearance',
                onTap: () async {
                  final newMode = isDark ? ThemeMode.light : ThemeMode.dark;
                  themeNotifier.value = newMode;
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setString('themeMode', newMode == ThemeMode.light ? 'light' : 'dark');
                },
              ),
              _MenuItem(
                icon: Icons.history_rounded,
                iconColor: colorScheme.primary,
                title: 'Scan History',
                subtitle: '12 products scanned',
                onTap: () {},
              ),
              _MenuItem(
                icon: Icons.shield_rounded,
                iconColor: const Color(0xFF00B894),
                title: 'Verified Products',
                subtitle: '11 authentic items',
                onTap: () {},
              ),
              _MenuItem(
                icon: Icons.notifications_outlined,
                iconColor: const Color(0xFFFF9933),
                title: 'Notifications',
                subtitle: 'Recall alerts, news',
                onTap: () {},
              ),
              _MenuItem(
                icon: Icons.help_outline_rounded,
                iconColor: const Color(0xFF9B59B6),
                title: 'Help & Support',
                subtitle: 'FAQs, contact us',
                onTap: () {},
              ),
              _MenuItem(
                icon: Icons.info_outline_rounded,
                iconColor: colorScheme.onSurface.withValues(alpha: 0.38),
                title: 'About BIS NIDAAN',
                subtitle: 'Version 1.0.0',
                onTap: () {},
              ),
            ]
                .asMap()
                .entries
                .map((e) => Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: e.value
                          .animate()
                          .fadeIn(delay: (200 + e.key * 80).ms)
                          .slideX(begin: 0.1, end: 0),
                    ))
                ,

            const SizedBox(height: 8),

            // Logout button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: OutlinedButton.icon(
                onPressed: _logout,
                icon: Icon(Icons.logout_rounded, color: colorScheme.error),
                label: Text(
                  'Logout',
                  style: TextStyle(
                    color: colorScheme.error,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: colorScheme.error, width: 1.5),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
              ),
            )
                .animate()
                .fadeIn(delay: 600.ms),

            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildStat(String value, String label, ColorScheme colorScheme) {
    return Expanded(
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(
              color: colorScheme.onPrimary,
              fontSize: 24,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(color: colorScheme.onPrimary.withValues(alpha: 0.54), fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildStatDivider(ColorScheme colorScheme) {
    return Container(
      width: 1,
      height: 40,
      color: colorScheme.onPrimary.withValues(alpha: 0.12),
    );
  }
}

class _MenuItem extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _MenuItem({
    required this.icon,
    required this.iconColor,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: colorScheme.onSurface.withValues(alpha: 0.06)),
        ),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: iconColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: iconColor, size: 22),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      color: colorScheme.onSurface,
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: TextStyle(color: colorScheme.onSurface.withValues(alpha: 0.54), fontSize: 12),
                  ),
                ],
              ),
            ),
            Icon(Icons.chevron_right_rounded, color: colorScheme.onSurface.withValues(alpha: 0.24)),
          ],
        ),
      ),
    );
  }
}
