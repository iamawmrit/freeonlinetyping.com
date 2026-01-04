import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Lazy load blog pages
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TypingModes = lazy(() => import("./pages/TypingModes"));

// Typing mode pages
import FifteenSecondTest from "./pages/typing-modes/FifteenSecondTest";
import TenMinuteTest from "./pages/typing-modes/TenMinuteTest";
import OneMinuteTest from "./pages/typing-modes/OneMinuteTest";
import FiveMinuteTest from "./pages/typing-modes/FiveMinuteTest";
import FunTypingTest from "./pages/typing-modes/FunTypingTest";
import SpeedTypingTest from "./pages/typing-modes/SpeedTypingTest";
import AccuracyTest from "./pages/typing-modes/AccuracyTest";
import BeginnerTest from "./pages/typing-modes/BeginnerTest";
import AdvancedTest from "./pages/typing-modes/AdvancedTest";
import ProfessionalTest from "./pages/typing-modes/ProfessionalTest";
import KidsTest from "./pages/typing-modes/KidsTest";
import CustomTextTest from "./pages/typing-modes/CustomTextTest";

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <Switch>
        <Route path={"/"} component={() => <Home />} />

        {/* Blog Routes */}
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />

        {/* Typing Modes List Page */}
        <Route path={"/typing-modes"} component={TypingModes} />

        {/* Typing Mode Landing Pages */}
        <Route path={"/15-second-typing-test"} component={FifteenSecondTest} />
        <Route path={"/10-minute-typing-test"} component={TenMinuteTest} />
        <Route path={"/1-minute-typing-test"} component={OneMinuteTest} />
        <Route path={"/5-minute-typing-test"} component={FiveMinuteTest} />
        <Route path={"/fun-typing-test"} component={FunTypingTest} />
        <Route path={"/speed-typing-test"} component={SpeedTypingTest} />
        <Route path={"/accuracy-typing-test"} component={AccuracyTest} />
        <Route path={"/beginner-typing-test"} component={BeginnerTest} />
        <Route path={"/advanced-typing-test"} component={AdvancedTest} />
        <Route path={"/professional-typing-test"} component={ProfessionalTest} />
        <Route path={"/typing-test-for-kids"} component={KidsTest} />
        <Route path={"/custom-text-typing-test"} component={CustomTextTest} />

        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="light"
        // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
