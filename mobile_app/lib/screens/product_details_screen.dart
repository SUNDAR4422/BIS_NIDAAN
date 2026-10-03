import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class ProductDetailsScreen extends StatefulWidget {
  final bool isAuthentic;
  final String productName;
  final String manufacturer;
  final String isNumber;
  final String batchNumber;
  final int trustScore;

  const ProductDetailsScreen({
    super.key,
    required this.isAuthentic,
    required this.productName,
    required this.manufacturer,
    required this.isNumber,
    required this.batchNumber,
    required this.trustScore,
  });

  @override
  State<ProductDetailsScreen> createState() => _ProductDetailsScreenState();
}

class _ProductDetailsScreenState extends State<ProductDetailsScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _gaugeController;
  late Animation<double> _gaugeAnimation;
  bool _reviewSubmitted = false;

  @override
  void initState() {
    super.initState();
    _gaugeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _gaugeAnimation = Tween<double>(
      begin: 0,
      end: widget.trustScore / 100,
    ).animate(CurvedAnimation(parent: _gaugeController, curve: Curves.easeOut));
    Future.delayed(const Duration(milliseconds: 400), _gaugeController.forward);
  }

  @override
  void dispose() {
    _gaugeController.dispose();
    super.dispose();
  }

  Color get _primaryColor =>
      widget.isAuthentic ? const Color(0xFF00B894) : const Color(0xFFD63031);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: CustomScrollView(
        slivers: [
          // Hero header
          SliverAppBar(
            expandedHeight: 260,
            pinned: true,
            backgroundColor: theme.scaffoldBackgroundColor,
            leading: IconButton(
              icon: Icon(Icons.arrow_back_ios_new_rounded, color: colorScheme.onSurface, size: 20),
              onPressed: () => Navigator.pop(context),
            ),
            actions: [
              IconButton(
                icon: Icon(Icons.share_rounded, color: colorScheme.onSurface, size: 20),
                onPressed: () {},
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      _primaryColor.withValues(alpha: isDark ? 0.4 : 0.15),
                      theme.scaffoldBackgroundColor,
                    ],
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 60),

                    // Trust score gauge
                    AnimatedBuilder(
                      animation: _gaugeAnimation,
                      builder: (context, child) => Stack(
                        alignment: Alignment.center,
                        children: [
                          SizedBox(
                            width: 140,
                            height: 140,
                            child: CircularProgressIndicator(
                              value: _gaugeAnimation.value,
                              strokeWidth: 10,
                              backgroundColor: Colors.white12,
                              color: _primaryColor,
                              strokeCap: StrokeCap.round,
                            ),
                          ),
                          Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                '${(widget.trustScore * _gaugeAnimation.value).round()}',
                                style: TextStyle(
                                  color: colorScheme.onSurface,
                                  fontSize: 40,
                                  fontWeight: FontWeight.w800,
                                  height: 1,
                                ),
                              ),
                              Text(
                                'Trust Score',
                                style: TextStyle(
                                  color: colorScheme.onSurface.withValues(alpha: 0.6),
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 16),

                    // Status badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                      decoration: BoxDecoration(
                        color: _primaryColor.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: _primaryColor.withValues(alpha: 0.4)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            widget.isAuthentic
                                ? Icons.verified_rounded
                                : Icons.gpp_bad_rounded,
                            color: _primaryColor,
                            size: 16,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            widget.isAuthentic
                                ? 'Authentic Product'
                                : 'Counterfeit Suspected',
                            style: TextStyle(
                              color: _primaryColor,
                              fontWeight: FontWeight.w700,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                const SizedBox(height: 8),

                // Product name
                Text(
                  widget.productName,
                  style: TextStyle(
                    color: colorScheme.onSurface,
                    fontSize: 22,
                    fontWeight: FontWeight.w800,
                    height: 1.2,
                  ),
                ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.2, end: 0),

                const SizedBox(height: 4),

                Text(
                  widget.manufacturer,
                  style: TextStyle(color: colorScheme.onSurface.withValues(alpha: 0.6), fontSize: 14),
                ).animate().fadeIn(delay: 300.ms),

                const SizedBox(height: 24),

                // Info cards
                _buildInfoCard(
                  title: 'Product Information',
                  icon: Icons.info_outline_rounded,
                  iconColor: colorScheme.primary,
                  items: [
                    _InfoItem('IS Standard', widget.isNumber),
                    _InfoItem('Batch Number', widget.batchNumber),
                    _InfoItem('Manufacturer', widget.manufacturer),
                    _InfoItem(
                      'Scan Date',
                      DateTime.now().toString().substring(0, 16),
                    ),
                  ],
                ).animate().fadeIn(delay: 350.ms).slideY(begin: 0.15, end: 0),

                const SizedBox(height: 16),

                _buildInfoCard(
                  title: 'Blockchain Ledger',
                  icon: Icons.link_rounded,
                  iconColor: const Color(0xFF00B894),
                  items: [
                    _InfoItem('Record Status', 'Verified ✓'),
                    _InfoItem('Block Hash', '0x4a7b...3f2e'),
                    _InfoItem('Ledger ID', 'BIS-${widget.batchNumber}-001'),
                    _InfoItem('Timestamp', 'Immutable'),
                  ],
                ).animate().fadeIn(delay: 450.ms).slideY(begin: 0.15, end: 0),

                const SizedBox(height: 24),

                // Review section
                if (!_reviewSubmitted)
                  _buildReviewPrompt()
                else
                  _buildReviewThankYou(),

                const SizedBox(height: 32),

                // Scan again button
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton.icon(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.qr_code_scanner_rounded),
                    label: const Text('Scan Another Product'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: colorScheme.surface,
                      foregroundColor: colorScheme.onSurface,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                        side: BorderSide(color: colorScheme.onSurface.withValues(alpha: 0.12)),
                      ),
                    ),
                  ),
                ).animate().fadeIn(delay: 600.ms),

                const SizedBox(height: 48),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoCard({
    required String title,
    required IconData icon,
    required Color iconColor,
    required List<_InfoItem> items,
  }) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: theme.colorScheme.onSurface.withValues(alpha: 0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: iconColor.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: iconColor, size: 18),
              ),
              const SizedBox(width: 12),
              Text(
                title,
                style: TextStyle(
                  color: theme.colorScheme.onSurface,
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ...items.map((item) => _buildDetailRow(item)),
        ],
      ),
    );
  }

  Widget _buildDetailRow(_InfoItem item) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            item.label,
            style: TextStyle(color: theme.colorScheme.onSurface.withValues(alpha: 0.54), fontSize: 13),
          ),
          Text(
            item.value,
            style: TextStyle(
              color: theme.colorScheme.onSurface,
              fontSize: 13,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildReviewPrompt() {
    int rating = 0;
    final theme = Theme.of(context);
    return StatefulBuilder(
      builder: (_, setInner) => Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: theme.colorScheme.onSurface.withValues(alpha: 0.06)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.rate_review_rounded, color: theme.colorScheme.secondary, size: 20),
                const SizedBox(width: 10),
                Text(
                  'Submit Your Review',
                  style: TextStyle(
                    color: theme.colorScheme.onSurface,
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              'Help others by sharing your experience with this product.',
              style: TextStyle(color: theme.colorScheme.onSurface.withValues(alpha: 0.54), fontSize: 13, height: 1.4),
            ),
            const SizedBox(height: 16),
            // Star rating
            Row(
              children: List.generate(
                5,
                (i) => GestureDetector(
                  onTap: () => setInner(() => rating = i + 1),
                  child: Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: Icon(
                      i < rating ? Icons.star_rounded : Icons.star_border_rounded,
                      color: theme.colorScheme.secondary,
                      size: 32,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: rating > 0
                    ? () => setState(() => _reviewSubmitted = true)
                    : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: theme.colorScheme.secondary,
                  foregroundColor: theme.colorScheme.onSecondary,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Submit Review',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
                ),
              ),
            ),
          ],
        ),
      ),
    ).animate().fadeIn(delay: 550.ms);
  }

  Widget _buildReviewThankYou() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF00B894).withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF00B894).withValues(alpha: 0.3)),
      ),
      child: const Row(
        children: [
          Icon(Icons.check_circle_rounded, color: Color(0xFF00B894), size: 24),
          SizedBox(width: 12),
          Text(
            'Thank you for your review!',
            style: TextStyle(
              color: Color(0xFF00B894),
              fontSize: 15,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    ).animate().fadeIn().scale(begin: const Offset(0.9, 0.9), end: const Offset(1, 1));
  }
}

class _InfoItem {
  final String label;
  final String value;
  _InfoItem(this.label, this.value);
}
