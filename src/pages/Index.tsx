
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Navigation, Compass, Route, Camera, Mic, MicOff, Volume2, VolumeX, MapPin, Settings, Power, Shield, Wifi } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isActive, setIsActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [navigationMode, setNavigationMode] = useState('indoor');
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [sensorData, setSensorData] = useState({
    lidar: 'Καθαρό',
    ultrasonic: 'Ενεργό',
    camera: 'Λειτουργικό',
    gps: 'Συνδεδεμένο'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setBatteryLevel(prev => Math.max(prev - 0.1, 0));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handlePowerToggle = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "Σύστημα Απενεργοποιημένο" : "Σύστημα Ενεργοποιημένο",
      description: isActive ? "Το ρομπότ τέθηκε σε κατάσταση αναμονής" : "Το ρομπότ είναι έτοιμο για χρήση",
    });
  };

  const handleVoiceCommand = () => {
    if (!isActive) return;
    toast({
      title: "Φωνητική Εντολή Ληφθείσα",
      description: "Επεξεργάζομαι την εντολή...",
    });
  };

  const simulateNavigation = () => {
    if (!isActive) return;
    toast({
      title: "Έναρξη Πλοήγησης",
      description: "Υπολογίζω την ασφαλέστερη διαδρομή...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            🤖 Έξυπνο Ρομπότ Οδηγός
          </h1>
          <p className="text-xl text-blue-200">
            Αυτόνομο Σύστημα Καθοδήγησης για Άτομα με Προβλήματα Όρασης
          </p>
        </div>

        {/* Status Bar */}
        <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handlePowerToggle}
                  variant={isActive ? "destructive" : "default"}
                  size="lg"
                  className="min-w-[150px]"
                >
                  <Power className="mr-2 h-5 w-5" />
                  {isActive ? "ΑΠΕΝΕΡΓΟΠΟΙΗΣΗ" : "ΕΝΕΡΓΟΠΟΙΗΣΗ"}
                </Button>
                <Badge variant={isActive ? "default" : "secondary"} className="text-lg px-4 py-2">
                  {isActive ? "ΕΝΕΡΓΟ" : "ΑΝΑΜΟΝΗ"}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="text-white font-medium">Μπαταρία:</div>
                  <Progress value={batteryLevel} className="w-32" />
                  <span className="text-white font-bold">{Math.round(batteryLevel)}%</span>
                </div>
                <Wifi className={`h-6 w-6 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
                <Shield className={`h-6 w-6 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Sensor Status */}
          <Card className="bg-slate-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Settings className="mr-2 h-6 w-6" />
                Κατάσταση Αισθητήρων
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">LIDAR:</span>
                  <Badge variant="default" className="bg-green-600">{sensorData.lidar}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Ultrasonic:</span>
                  <Badge variant="default" className="bg-green-600">{sensorData.ultrasonic}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Κάμερα:</span>
                  <Badge variant="default" className="bg-green-600">{sensorData.camera}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">GPS:</span>
                  <Badge variant="default" className="bg-green-600">{sensorData.gps}</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="text-sm text-gray-300">Περιβάλλον:</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={navigationMode === 'indoor' ? 'default' : 'outline'}
                    onClick={() => setNavigationMode('indoor')}
                    disabled={!isActive}
                    className="text-sm"
                  >
                    Εσωτερικό
                  </Button>
                  <Button
                    variant={navigationMode === 'outdoor' ? 'default' : 'outline'}
                    onClick={() => setNavigationMode('outdoor')}
                    disabled={!isActive}
                    className="text-sm"
                  >
                    Εξωτερικό
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Controls */}
          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Mic className="mr-2 h-6 w-6" />
                Φωνητικός Έλεγχος
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  variant={voiceEnabled ? "default" : "outline"}
                  className="w-full"
                  disabled={!isActive}
                >
                  {voiceEnabled ? <Mic className="mr-2 h-4 w-4" /> : <MicOff className="mr-2 h-4 w-4" />}
                  {voiceEnabled ? "Μικρόφωνο Ενεργό" : "Μικρόφωνο Απενεργό"}
                </Button>
                
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant={soundEnabled ? "default" : "outline"}
                  className="w-full"
                  disabled={!isActive}
                >
                  {soundEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                  {soundEnabled ? "Ήχος Ενεργός" : "Ήχος Απενεργός"}
                </Button>
                
                <Button
                  onClick={handleVoiceCommand}
                  variant="secondary"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!isActive || !voiceEnabled}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Δώσε Εντολή
                </Button>
              </div>
              
              <Separator />
              
              <div className="text-sm text-gray-300 space-y-2">
                <div className="font-medium">Διαθέσιμες Εντολές:</div>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>"Οδήγησέ με στο..."</li>
                  <li>"Σταμάτα"</li>
                  <li>"Βρες την έξοδο"</li>
                  <li>"Που είμαι;"</li>
                  <li>"Τι βλέπεις;"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <Card className="bg-slate-800/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Navigation className="mr-2 h-6 w-6" />
                Πλοήγηση
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={simulateNavigation}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!isActive}
              >
                <Route className="mr-2 h-4 w-4" />
                Έναρξη Πλοήγησης
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                disabled={!isActive}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Τρέχουσα Θέση
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                disabled={!isActive}
              >
                <Compass className="mr-2 h-4 w-4" />
                Προσανατολισμός
              </Button>
              
              <Separator />
              
              <div className="text-sm text-gray-300 space-y-2">
                <div className="font-medium">Λειτουργίες AI:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Αναγνώριση Εμποδίων:</span>
                    <Badge variant="secondary" className="bg-green-700">ON</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Αναγνώριση Αντικειμένων:</span>
                    <Badge variant="secondary" className="bg-green-700">ON</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ανάλυση Κειμένου:</span>
                    <Badge variant="secondary" className="bg-green-700">ON</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "🔍", title: "Computer Vision", desc: "Αναγνώριση αντικειμένων με OpenCV" },
            { icon: "📡", title: "LIDAR Sensors", desc: "Υπερηχητική αποφυγή εμποδίων" },
            { icon: "🗣️", title: "Text-to-Speech", desc: "Αμφίδρομη φωνητική επικοινωνία" },
            { icon: "🔒", title: "Privacy First", desc: "Σεβασμός προσωπικής ιδιωτικότητας" },
          ].map((feature, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-600/30 hover:border-cyan-400/50 transition-colors">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Innovation Section */}
        <Card className="bg-gradient-to-r from-cyan-800/20 to-blue-800/20 border-cyan-400/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl text-center">💡 Καινοτομία & Επέκταση</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">📱</div>
                <h3 className="text-white font-semibold">Smartphone Integration</h3>
                <p className="text-gray-300 text-sm">Σύνδεση με εφαρμογή για ρύθμιση προορισμών</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🛒</div>
                <h3 className="text-white font-semibold">Follow Me Mode</h3>
                <p className="text-gray-300 text-sm">Βοήθεια σε σούπερ μάρκετ, νοσοκομεία, αεροδρόμια</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🧠</div>
                <h3 className="text-white font-semibold">Federated Learning</h3>
                <p className="text-gray-300 text-sm">Τοπική εκπαίδευση χωρίς διαρροή δεδομένων</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
