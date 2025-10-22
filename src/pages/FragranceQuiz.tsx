import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

type QuizQuestion = {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
};

type FragranceResult = {
  name: string;
  description: string;
  notes: string[];
  personality: string;
};

const FragranceQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's your ideal weekend activity?",
      options: [
        { text: "Beach getaway with tropical vibes", value: "tropical" },
        { text: "Cozy café hopping in the city", value: "warm" },
        { text: "Hiking in fresh mountain air", value: "fresh" },
        { text: "Elegant dinner party with friends", value: "sophisticated" },
      ],
    },
    {
      id: 2,
      question: "Which word best describes your style?",
      options: [
        { text: "Bold and adventurous", value: "tropical" },
        { text: "Sweet and romantic", value: "warm" },
        { text: "Clean and minimalist", value: "fresh" },
        { text: "Classic and timeless", value: "sophisticated" },
      ],
    },
    {
      id: 3,
      question: "What season speaks to your soul?",
      options: [
        { text: "Summer - all day, every day", value: "tropical" },
        { text: "Fall - cozy sweater weather", value: "warm" },
        { text: "Spring - fresh blooms and renewal", value: "fresh" },
        { text: "Winter - elegant and mysterious", value: "sophisticated" },
      ],
    },
  ];

  const fragranceResults: Record<string, FragranceResult> = {
    tropical: {
      name: "Island Paradise",
      description: "A vibrant, sun-kissed fragrance that captures the essence of tropical beaches and exotic adventures.",
      notes: ["Coconut", "Pineapple", "Vanilla", "Musk"],
      personality: "You're bold, adventurous, and always ready for the next getaway!",
    },
    warm: {
      name: "Golden Hour",
      description: "A warm, comforting scent that wraps you in sweet sophistication and cozy charm.",
      notes: ["Vanilla", "Caramel", "Amber", "Sandalwood"],
      personality: "You're romantic, sweet, and love creating cozy moments!",
    },
    fresh: {
      name: "Morning Dew",
      description: "A crisp, invigorating fragrance that embodies clarity and natural beauty.",
      notes: ["Bergamot", "White Tea", "Cucumber", "Mint"],
      personality: "You're refreshing, authentic, and effortlessly cool!",
    },
    sophisticated: {
      name: "Noir Elegance",
      description: "A timeless, refined scent that exudes confidence and classic beauty.",
      notes: ["Rose", "Oud", "Patchouli", "Musk"],
      personality: "You're elegant, refined, and timelessly chic!",
    },
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = (): FragranceResult => {
    const counts: Record<string, number> = {};
    answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const topChoice = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    return fragranceResults[topChoice];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? getResult() : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Find Your Signature Scent
            </h1>
            <p className="text-lg text-muted-foreground">
              Answer a few questions to discover your perfect fragrance match
            </p>
          </div>

          {!showResult ? (
            <Card className="p-8 shadow-xl animate-fade-in">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 text-left border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {option.text}
                        </span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              {currentQuestion > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1);
                    setAnswers(answers.slice(0, -1));
                  }}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Question
                </Button>
              )}
            </Card>
          ) : (
            <Card className="p-8 shadow-xl animate-fade-in">
              {/* Results */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Your Perfect Match</h2>
                <h3 className="text-4xl font-serif text-primary mb-4">
                  {result?.name}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {result?.description}
                </p>
                <p className="text-base font-medium text-primary/80 mb-8">
                  {result?.personality}
                </p>

                {/* Fragrance Notes */}
                <div className="bg-secondary/30 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold mb-4 text-lg">Key Notes</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {result?.notes.map((note, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-background rounded-full text-sm font-medium border"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 rounded-full"
                  onClick={() => navigate("/products?category=fragrance")}
                >
                  Shop Fragrances
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={resetQuiz}
                >
                  Retake Quiz
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FragranceQuiz;
