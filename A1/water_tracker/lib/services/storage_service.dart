import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StorageService extends ChangeNotifier {
  late SharedPreferences _prefs;
  int _dailyIntake = 0;
  int _dailyGoal = 2000;
  String _lastResetDate = '';
  String _currentMessage = "Begin with a sip.";

  final List<String> _messages = [
    "Breathe in, breathe out.",
    "Visual clarity entails clean inputs.",
    "Hydrate your body, clarify your mind.",
    "A sip of serenity.",
    "Flow like water.",
    "Stay present.",
    "Nourish your thoughts.",
    "Calmness is power.",
    "Your mind is a clear pool.",
    "Refresh your perspective.",
    "Be like water.",
    "Mindfulness in every drop.",
  ];

  int get dailyIntake => _dailyIntake;
  int get dailyGoal => _dailyGoal;
  double get progress => (_dailyIntake / _dailyGoal).clamp(0.0, 1.0);
  String get currentMessage => _currentMessage;

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
    _dailyGoal = _prefs.getInt('daily_goal') ?? 2000;
    _dailyIntake = _prefs.getInt('daily_intake') ?? 0;
    _lastResetDate = _prefs.getString('last_reset_date') ?? '';
    _currentMessage = _messages[0]; // Start with default

    _checkDailyReset();
  }

  void _checkDailyReset() {
    final now = DateTime.now();
    final todayStr = "${now.year}-${now.month}-${now.day}";

    if (_lastResetDate != todayStr) {
      _dailyIntake = 0;
      _lastResetDate = todayStr;
      _prefs.setInt('daily_intake', 0);
      _prefs.setString('last_reset_date', todayStr);
      notifyListeners();
    }
  }

  Future<void> addWater(int amount) async {
    _checkDailyReset();
    _dailyIntake += amount;
    _currentMessage = (_messages..shuffle()).first;
    await _prefs.setInt('daily_intake', _dailyIntake);
    notifyListeners();
  }

  Future<void> setGoal(int goal) async {
    _dailyGoal = goal;
    await _prefs.setInt('daily_goal', goal);
    notifyListeners();
  }
}
