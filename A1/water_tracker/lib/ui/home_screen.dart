import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:water_tracker/services/storage_service.dart';
import 'package:glass_kit/glass_kit.dart';
import 'package:water_tracker/ui/widgets/water_wave.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final storage = context.watch<StorageService>();

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF2E335A),
              Color(0xFF1C1B33),
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Hydration',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 40),
              Center(
                child: GlassContainer.clearGlass(
                  height: 300,
                  width: 300,
                  borderRadius: BorderRadius.circular(150),
                  borderColor: Colors.white.withOpacity(0.3),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(150),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        WaterWave(
                          progress: storage.progress,
                          color: const Color(0xFF4AF1F2).withOpacity(0.5),
                        ),
                        Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '${storage.dailyIntake} ml',
                              style: const TextStyle(
                                fontSize: 40, 
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                shadows: [Shadow(blurRadius: 10, color: Colors.black45, offset: Offset(2, 2))],
                              ),
                            ),
                            Text(
                              'of ${storage.dailyGoal} ml',
                              style: const TextStyle(
                                fontSize: 16, 
                                color: Colors.white70,
                                shadows: [Shadow(blurRadius: 5, color: Colors.black45)],
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Text(
                  storage.currentMessage,
                  textAlign: TextAlign.center,
                  style: GoogleFonts.caveat(
                    fontSize: 24,
                    color: Colors.white70,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  FloatingActionButton(
                    onPressed: () => storage.addWater(250),
                    child: const Icon(Icons.water_drop),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
