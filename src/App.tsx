/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleModal from "./components/ArticleModal";
import ConsumerAdviceHome from "./pages/ConsumerAdviceHome";
import ScamsIndex from "./pages/ScamsIndex";
import Enforcement from "./pages/Enforcement";
import Policy from "./pages/Policy";
import NewsEvents from "./pages/NewsEvents";
import AboutFTC from "./pages/AboutFTC";
import ClientReport from "./pages/ClientReport";
import { Article } from "./types";
import { AnimatePresence, motion } from "motion/react";

const getNormalizedPath = (path: string) => {
  if (path === "/" || path === "/index.html") {
    return "/advice-and-guidance/consumer-blog/98471029/spotting-scams-2026";
  }
  return path;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    getNormalizedPath(window.location.pathname)
  );
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenArticle = (article: Article) => {
    setActiveArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseArticle = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setActiveArticle(null);
    }, 200); // Allow modal exit transition to complete
  };

  const handleNavigate = (path: string) => {
    const normalized = getNormalizedPath(path);
    window.history.pushState(null, "", normalized);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    const motionProps = {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.25 }
    };

    switch (currentPath) {
      case "/enforcement/cases-and-proceedings/30056824/consent-agreement-restitution":
        return (
          <motion.div key="enforcement-page" {...motionProps}>
            <Enforcement onNavigate={handleNavigate} />
          </motion.div>
        );
      case "/policy/rules-and-regulations/10293847/advertising-endorsement-guides":
        return (
          <motion.div key="policy-page" {...motionProps}>
            <Policy onNavigate={handleNavigate} />
          </motion.div>
        );
      case "/advice-and-guidance/scams-and-alerts/88371947/avoiding-reporting":
        return (
          <motion.div key="scams-page" {...motionProps}>
            <ScamsIndex onOpenArticle={handleOpenArticle} onNavigate={handleNavigate} />
          </motion.div>
        );
      case "/advice-and-guidance/report/77391024/norton-consumer-investigation":
        return (
          <motion.div key="clientreport-page-77391024" {...motionProps}>
            <ClientReport onNavigate={handleNavigate} recordId="77391024" />
          </motion.div>
        );
      case "/advice-and-guidance/report/88401925/washington-trust-consumer-investigation":
        return (
          <motion.div key="clientreport-page-88401925" {...motionProps}>
            <ClientReport onNavigate={handleNavigate} recordId="88401925" />
          </motion.div>
        );
      case "/advice-and-guidance/report/99512036/truist-consumer-investigation":
        return (
          <motion.div key="clientreport-page-99512036" {...motionProps}>
            <ClientReport onNavigate={handleNavigate} recordId="99512036" />
          </motion.div>
        );
      case "/news-and-events/press-releases/40058291/voice-cloning-workshop-announcement":
        return (
          <motion.div key="newsevents-page" {...motionProps}>
            <NewsEvents onNavigate={handleNavigate} />
          </motion.div>
        );
      case "/about-the-ftc/commissioners/50067219/bureau-consumer-protection-structure":
        return (
          <motion.div key="aboutftc-page" {...motionProps}>
            <AboutFTC onNavigate={handleNavigate} />
          </motion.div>
        );
      case "/advice-and-guidance/consumer-blog/98471029/spotting-scams-2026":
      default:
        return (
          <motion.div key="home-page" {...motionProps}>
            <ConsumerAdviceHome 
              onOpenArticle={handleOpenArticle} 
              onNavigate={handleNavigate} 
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col justify-between font-sans">
      {/* 1. Federal Header */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* 2. Main Page with Transition Animations */}
      <div className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </div>

      {/* 3. Article Detail Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <ArticleModal
            article={activeArticle}
            isOpen={isModalOpen}
            onClose={handleCloseArticle}
          />
        )}
      </AnimatePresence>

      {/* 4. Federal Brand Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

