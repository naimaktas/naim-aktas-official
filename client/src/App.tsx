import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TrackDetail from "./pages/TrackDetail";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/track/:slug" component={TrackDetail} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {/* Kitabına uygun standart alt klasör yönlendirmesi */}
          <WouterRouter base="/naim-aktas-official">
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
