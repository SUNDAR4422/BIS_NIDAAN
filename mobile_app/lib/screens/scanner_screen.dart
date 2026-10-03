import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_scanner/mobile_scanner.dart';
import 'product_details_screen.dart';

class ScannerScreen extends StatefulWidget {
  const ScannerScreen({super.key});

  @override
  State<ScannerScreen> createState() => _ScannerScreenState();
}

class _ScannerScreenState extends State<ScannerScreen>
    with SingleTickerProviderStateMixin {
  MobileScannerController cameraController = MobileScannerController();
  bool _isProcessing = false;
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
  }

  void _onDetect(BarcodeCapture capture) async {
    if (_isProcessing) return;
    final barcodes = capture.barcodes;
    if (barcodes.isNotEmpty && barcodes.first.rawValue != null) {
      final String code = barcodes.first.rawValue!;
      setState(() => _isProcessing = true);
      cameraController.stop();

      try {
        final response = await http.post(
          Uri.parse('http://10.0.2.2:3000/api/verify'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'token': code}),
        ).timeout(const Duration(seconds: 10));

        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          if (mounted) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (_) => ProductDetailsScreen(
                  isAuthentic: data['authentic'],
                  productName: data['product_name'],
                  manufacturer: data['manufacturer'],
                  isNumber: data['is_standard'],
                  batchNumber: data['batch_number'],
                  trustScore: data['trust_score'],
                ),
              ),
            );
          }
        } else {
          throw Exception('Verification failed');
        }
      } catch (_) {
        if (mounted) {
          setState(() => _isProcessing = false);
          cameraController.start();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: const Text('Network error. Make sure the backend is running.'),
              backgroundColor: Theme.of(context).colorScheme.error,
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
      }
    }
  }

  @override
  void dispose() {
    cameraController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Camera feed
          Positioned.fill(
            child: MobileScanner(
              controller: cameraController,
              onDetect: _onDetect,
            ),
          ),

          // Dark overlay with cutout
          Positioned.fill(
            child: CustomPaint(
              painter: _ScanOverlayPainter(),
            ),
          ),

          // Top bar
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: Container(
                        width: 42,
                        height: 42,
                        decoration: BoxDecoration(
                          color: Colors.black54,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: const Icon(
                          Icons.arrow_back_ios_new_rounded,
                          color: Colors.white,
                          size: 18,
                        ),
                      ),
                    ),
                    const Expanded(
                      child: Text(
                        'Scan Data Matrix',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () => cameraController.toggleTorch(),
                      child: Container(
                        width: 42,
                        height: 42,
                        decoration: BoxDecoration(
                          color: Colors.black54,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: const Icon(
                          Icons.flash_on_rounded,
                          color: Colors.white,
                          size: 20,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ).animate().fadeIn(duration: 400.ms),
          ),

          // Center scan frame with animated corners
          Center(
            child: SizedBox(
              width: 260,
              height: 260,
              child: AnimatedBuilder(
                animation: _pulseController,
                builder: (context, child) {
                  return Stack(
                    children: [
                      // Pulse ring
                      Center(
                        child: Container(
                          width: 260 + (_pulseController.value * 20),
                          height: 260 + (_pulseController.value * 20),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: colorScheme.primary.withValues(
                                alpha: (1 - _pulseController.value) * 0.5,
                              ),
                              width: 1.5,
                            ),
                          ),
                        ),
                      ),
                      // Corners
                      CustomPaint(
                        size: const Size(260, 260),
                        painter: _CornerPainter(
                          color: colorScheme.primary,
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ),

          // Bottom instructions
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.fromLTRB(24, 32, 24, 48),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [Colors.black87, Colors.transparent],
                ),
              ),
              child: Column(
                children: [
                  const Text(
                    'Align the Data Matrix code\nwithin the frame to verify',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 15,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 20),
                  GestureDetector(
                    onTap: () => cameraController.switchCamera(),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: Colors.white24),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.flip_camera_android_rounded, color: Colors.white, size: 18),
                          SizedBox(width: 8),
                          Text('Flip Camera', style: TextStyle(color: Colors.white, fontSize: 14)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 200.ms),
          ),

          // Processing overlay
          if (_isProcessing)
            Positioned.fill(
              child: Container(
                color: Colors.black87,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: colorScheme.primary.withValues(alpha: 0.15),
                        border: Border.all(color: colorScheme.primary, width: 2),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(20),
                        child: CircularProgressIndicator(
                          color: colorScheme.primary,
                          strokeWidth: 3,
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Verifying Authenticity...',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Checking blockchain records',
                      style: TextStyle(color: Colors.white54, fontSize: 13),
                    ),
                  ],
                ),
              ).animate().fadeIn(duration: 300.ms),
            ),
        ],
      ),
    );
  }
}

class _ScanOverlayPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.black.withValues(alpha: 0.6);

    const cutW = 260.0;
    const cutH = 260.0;
    final cutX = (size.width - cutW) / 2;
    final cutY = (size.height - cutH) / 2;
    const radius = Radius.circular(16);

    final fullRect = Rect.fromLTWH(0, 0, size.width, size.height);
    final cutoutRect = Rect.fromLTWH(cutX, cutY, cutW, cutH);
    final path = Path()
      ..addRect(fullRect)
      ..addRRect(RRect.fromRectAndRadius(cutoutRect, radius));
    path.fillType = PathFillType.evenOdd;
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(_) => false;
}

class _CornerPainter extends CustomPainter {
  final Color color;
  _CornerPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 4
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;

    const length = 28.0;
    const radius = 14.0;
    final w = size.width;
    final h = size.height;

    // Top left
    canvas.drawLine(const Offset(radius, 0), const Offset(radius + length, 0), paint);
    canvas.drawLine(const Offset(0, radius), const Offset(0, radius + length), paint);
    canvas.drawArc(const Rect.fromLTWH(0, 0, radius * 2, radius * 2), -3.14, 3.14 / 2, false, paint);

    // Top right
    canvas.drawLine(Offset(w - radius - length, 0), Offset(w - radius, 0), paint);
    canvas.drawLine(Offset(w, radius), Offset(w, radius + length), paint);
    canvas.drawArc(Rect.fromLTWH(w - radius * 2, 0, radius * 2, radius * 2), -3.14 / 2, 3.14 / 2, false, paint);

    // Bottom left
    canvas.drawLine(Offset(0, radius), Offset(0, h - radius - length), paint);
    canvas.drawLine(Offset(radius, h), Offset(radius + length, h), paint);
    canvas.drawArc(Rect.fromLTWH(0, h - radius * 2, radius * 2, radius * 2), 3.14 / 2, 3.14 / 2, false, paint);

    // Bottom right
    canvas.drawLine(Offset(w, h - radius - length), Offset(w, h - radius), paint);
    canvas.drawLine(Offset(w - radius - length, h), Offset(w - radius, h), paint);
    canvas.drawArc(Rect.fromLTWH(w - radius * 2, h - radius * 2, radius * 2, radius * 2), 0, 3.14 / 2, false, paint);
  }

  @override
  bool shouldRepaint(_) => false;
}
