import 'dart:math' as math;
import 'package:flutter/material.dart';

class WaterWave extends StatefulWidget {
  final double progress;
  final Color color;

  const WaterWave({
    super.key,
    required this.progress,
    this.color = const Color(0xFF4AF1F2),
  });

  @override
  State<WaterWave> createState() => _WaterWaveState();
}

class _WaterWaveState extends State<WaterWave> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return CustomPaint(
          painter: _WaterWavePainter(
            progress: widget.progress,
            animationValue: _controller.value,
            color: widget.color,
          ),
          child: Container(),
        );
      },
    );
  }
}

class _WaterWavePainter extends CustomPainter {
  final double progress;
  final double animationValue;
  final Color color;

  _WaterWavePainter({
    required this.progress,
    required this.animationValue,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color.withOpacity(0.4)
      ..style = PaintingStyle.fill;

    final path = Path();
    final y = size.height * (1 - progress);
    
    // Wave 1
    path.moveTo(0, y);
    for (double i = 0; i <= size.width; i++) {
        path.lineTo(
          i,
          y + 10 * math.sin((i / size.width * 2 * math.pi) + (animationValue * 2 * math.pi)),
        );
    }
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();
    canvas.drawPath(path, paint);

    // Wave 2 (offset)
    final paint2 = Paint()
      ..color = color.withOpacity(0.6)
      ..style = PaintingStyle.fill;
      
    final path2 = Path();
    path2.moveTo(0, y);
    for (double i = 0; i <= size.width; i++) {
        path2.lineTo(
          i,
          y + 12 * math.sin((i / size.width * 2 * math.pi) + ((animationValue + 0.5) * 2 * math.pi)),
        );
    }
    path2.lineTo(size.width, size.height);
    path2.lineTo(0, size.height);
    path2.close();
    canvas.drawPath(path2, paint2);
  }

  @override
  bool shouldRepaint(covariant _WaterWavePainter oldDelegate) {
    return oldDelegate.progress != progress || oldDelegate.animationValue != animationValue;
  }
}
