import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../services/auth_service.dart';
import 'home_screen.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _isLoading = false;

  // Login fields
  final _loginEmailController = TextEditingController();
  final _loginPasswordController = TextEditingController();
  bool _loginPasswordVisible = false;

  // Register fields
  final _registerNameController = TextEditingController();
  final _registerEmailController = TextEditingController();
  final _registerPhoneController = TextEditingController();
  final _registerPasswordController = TextEditingController();
  final _registerConfirmController = TextEditingController();
  bool _registerPasswordVisible = false;

  final _loginFormKey = GlobalKey<FormState>();
  final _registerFormKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _tabController.dispose();
    _loginEmailController.dispose();
    _loginPasswordController.dispose();
    _registerNameController.dispose();
    _registerEmailController.dispose();
    _registerPhoneController.dispose();
    _registerPasswordController.dispose();
    _registerConfirmController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_loginFormKey.currentState!.validate()) return;
    setState(() => _isLoading = true);

    final result = await AuthService.login(
      email: _loginEmailController.text.trim(),
      password: _loginPasswordController.text,
    );

    if (!mounted) return;
    setState(() => _isLoading = false);

    if (result['success'] == true) {
      _goToHome();
    } else {
      _showError(result['message'] ?? 'Login failed');
    }
  }

  Future<void> _register() async {
    if (!_registerFormKey.currentState!.validate()) return;
    setState(() => _isLoading = true);

    final result = await AuthService.register(
      name: _registerNameController.text.trim(),
      email: _registerEmailController.text.trim(),
      password: _registerPasswordController.text,
      phone: _registerPhoneController.text.trim(),
    );

    if (!mounted) return;
    setState(() => _isLoading = false);

    if (result['success'] == true) {
      // Auto-login after registration
      await AuthService.login(
        email: _registerEmailController.text.trim(),
        password: _registerPasswordController.text,
      );
      if (!mounted) return;
      _goToHome();
    } else {
      _showError(result['message'] ?? 'Registration failed');
    }
  }

  void _goToHome() {
    Navigator.pushReplacement(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) => const HomeScreen(),
        transitionsBuilder: (context, anim, secondaryAnim, child) =>
            FadeTransition(opacity: anim, child: child),
        transitionDuration: const Duration(milliseconds: 500),
      ),
    );
  }

  void _showError(String message) {
    final theme = Theme.of(context);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: TextStyle(color: theme.colorScheme.onError)),
        backgroundColor: theme.colorScheme.error,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final onSurface = colorScheme.onSurface;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          // Background decoration
          Positioned(
            top: -60,
            right: -60,
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: colorScheme.primary.withValues(alpha: 0.08),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: colorScheme.secondary.withValues(alpha: 0.05),
              ),
            ),
          ),

          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 28),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 32),

                  // Header
                  Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [
                              colorScheme.primary.withValues(alpha: 0.7),
                              colorScheme.primary,
                            ],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: colorScheme.primary.withValues(alpha: 0.4),
                              blurRadius: 12,
                            ),
                          ],
                        ),
                        child: Icon(
                          Icons.verified_user_rounded,
                          color: colorScheme.onPrimary,
                          size: 26,
                        ),
                      ),
                      const SizedBox(width: 14),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'BIS NIDAAN',
                            style: TextStyle(
                              color: onSurface,
                              fontSize: 20,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1.5,
                            ),
                          ),
                          Text(
                            'Bureau of Indian Standards',
                            style: TextStyle(
                              color: colorScheme.secondary,
                              fontSize: 11,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ).animate().fadeIn(duration: 500.ms).slideX(begin: -0.2, end: 0),

                  const SizedBox(height: 40),

                  Text(
                    _tabController.index == 0
                        ? 'Welcome\nBack!'
                        : 'Create\nAccount',
                    style: TextStyle(
                      color: onSurface,
                      fontSize: 38,
                      fontWeight: FontWeight.w800,
                      height: 1.1,
                    ),
                  ).animate().fadeIn(delay: 150.ms).slideY(begin: 0.3, end: 0),

                  const SizedBox(height: 8),

                  Text(
                    _tabController.index == 0
                        ? 'Sign in to verify products and track your scans.'
                        : 'Join millions of Indians verifying product quality.',
                    style: TextStyle(
                      color: onSurface.withValues(alpha: 0.54),
                      fontSize: 15,
                      height: 1.4,
                    ),
                  ).animate().fadeIn(delay: 250.ms),

                  const SizedBox(height: 36),

                  // Tab bar
                  Container(
                    decoration: BoxDecoration(
                      color: colorScheme.surface,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: TabBar(
                      controller: _tabController,
                      indicator: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        color: colorScheme.primary,
                        boxShadow: [
                          BoxShadow(
                            color: colorScheme.primary.withValues(alpha: 0.3),
                            blurRadius: 8,
                          ),
                        ],
                      ),
                      indicatorSize: TabBarIndicatorSize.tab,
                      dividerColor: Colors.transparent,
                      labelColor: colorScheme.onPrimary,
                      unselectedLabelColor: onSurface.withValues(alpha: 0.38),
                      labelStyle: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                      tabs: const [
                        Tab(text: 'Login'),
                        Tab(text: 'Register'),
                      ],
                    ),
                  ).animate().fadeIn(delay: 300.ms),

                  const SizedBox(height: 32),

                  // Tab views (inline, not inside TabBarView to avoid height issues)
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 350),
                    child: _tabController.index == 0
                        ? _buildLoginForm()
                        : _buildRegisterForm(),
                  ),

                  const SizedBox(height: 48),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoginForm() {
    return Form(
      key: _loginFormKey,
      child: Column(
        key: const ValueKey('login'),
        children: [
          _buildField(
            controller: _loginEmailController,
            label: 'Email Address',
            icon: Icons.email_outlined,
            keyboardType: TextInputType.emailAddress,
            validator: (v) => v!.contains('@') ? null : 'Enter a valid email',
          ),
          const SizedBox(height: 16),
          _buildField(
            controller: _loginPasswordController,
            label: 'Password',
            icon: Icons.lock_outline_rounded,
            isPassword: true,
            isPasswordVisible: _loginPasswordVisible,
            onTogglePassword: () =>
                setState(() => _loginPasswordVisible = !_loginPasswordVisible),
            validator: (v) => v!.length >= 6 ? null : 'Min 6 characters',
          ),
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: () {},
              child: const Text(
                'Forgot Password?',
                style: TextStyle(color: Color(0xFF4A7AFF), fontSize: 14),
              ),
            ),
          ),
          const SizedBox(height: 12),
          _buildSubmitButton('Login', _login),
        ],
      ),
    ).animate().fadeIn(duration: 400.ms);
  }

  Widget _buildRegisterForm() {
    return Form(
      key: _registerFormKey,
      child: Column(
        key: const ValueKey('register'),
        children: [
          _buildField(
            controller: _registerNameController,
            label: 'Full Name',
            icon: Icons.person_outline_rounded,
            validator: (v) => v!.length >= 2 ? null : 'Enter your name',
          ),
          const SizedBox(height: 16),
          _buildField(
            controller: _registerEmailController,
            label: 'Email Address',
            icon: Icons.email_outlined,
            keyboardType: TextInputType.emailAddress,
            validator: (v) => v!.contains('@') ? null : 'Enter a valid email',
          ),
          const SizedBox(height: 16),
          _buildField(
            controller: _registerPhoneController,
            label: 'Mobile Number',
            icon: Icons.phone_outlined,
            keyboardType: TextInputType.phone,
            validator: (v) => v!.length == 10 ? null : 'Enter 10-digit number',
          ),
          const SizedBox(height: 16),
          _buildField(
            controller: _registerPasswordController,
            label: 'Password',
            icon: Icons.lock_outline_rounded,
            isPassword: true,
            isPasswordVisible: _registerPasswordVisible,
            onTogglePassword: () =>
                setState(() => _registerPasswordVisible = !_registerPasswordVisible),
            validator: (v) => v!.length >= 6 ? null : 'Min 6 characters',
          ),
          const SizedBox(height: 16),
          _buildField(
            controller: _registerConfirmController,
            label: 'Confirm Password',
            icon: Icons.lock_outline_rounded,
            isPassword: true,
            isPasswordVisible: _registerPasswordVisible,
            onTogglePassword: () {},
            validator: (v) => v == _registerPasswordController.text
                ? null
                : 'Passwords do not match',
          ),
          const SizedBox(height: 28),
          _buildSubmitButton('Create Account', _register),
        ],
      ),
    ).animate().fadeIn(duration: 400.ms);
  }

  Widget _buildField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    bool isPassword = false,
    bool isPasswordVisible = false,
    VoidCallback? onTogglePassword,
    String? Function(String?)? validator,
  }) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final onSurface = colorScheme.onSurface;

    return TextFormField(
      controller: controller,
      obscureText: isPassword && !isPasswordVisible,
      keyboardType: keyboardType,
      style: TextStyle(color: onSurface, fontSize: 15),
      validator: validator,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: onSurface.withValues(alpha: 0.54), fontSize: 14),
        prefixIcon: Icon(icon, color: colorScheme.primary, size: 22),
        suffixIcon: isPassword
            ? IconButton(
                icon: Icon(
                  isPasswordVisible
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                  color: onSurface.withValues(alpha: 0.38),
                  size: 20,
                ),
                onPressed: onTogglePassword,
              )
            : null,
        filled: true,
        fillColor: colorScheme.surface,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(
            color: onSurface.withValues(alpha: 0.08),
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: colorScheme.primary, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: colorScheme.error),
        ),
        errorStyle: TextStyle(color: colorScheme.error),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
      ),
    );
  }

  Widget _buildSubmitButton(String label, VoidCallback onPressed) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    return SizedBox(
      width: double.infinity,
      height: 58,
      child: ElevatedButton(
        onPressed: _isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: colorScheme.primary,
          foregroundColor: colorScheme.onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          elevation: 8,
          shadowColor: colorScheme.primary.withValues(alpha: 0.4),
        ),
        child: _isLoading
            ? SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  color: colorScheme.onPrimary,
                  strokeWidth: 2.5,
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    label,
                    style: const TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(Icons.arrow_forward_rounded, size: 20),
                ],
              ),
      ),
    );
  }
}
