"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getCVData, saveCVConfig } from "@/app/actions/cv";
import { savePortfolio } from "@/app/actions/portfolio";
import { CVConfig, defaultCVConfig, CVDataPayload } from "@/lib/cvData";
import { PortfolioData, defaultPortfolioData } from "@/lib/portfolioData";

export function useCvBuilderState() {
  const [data, setData] = useState<CVDataPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom debounced save config
  const debounceConfigTimeout = useRef<NodeJS.Timeout | null>(null);
  const debouncedSaveConfig = useCallback((config: CVConfig) => {
    if (debounceConfigTimeout.current) clearTimeout(debounceConfigTimeout.current);
    debounceConfigTimeout.current = setTimeout(() => {
      saveCVConfig(config).catch(console.error);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('dashboard_cv_cache');
      }
    }, 1000);
  }, []);

  // Custom debounced save portfolio
  const debouncePortfolioTimeout = useRef<NodeJS.Timeout | null>(null);
  const debouncedSavePortfolio = useCallback((portfolio: PortfolioData) => {
    if (debouncePortfolioTimeout.current) clearTimeout(debouncePortfolioTimeout.current);
    debouncePortfolioTimeout.current = setTimeout(() => {
      savePortfolio(portfolio).catch(console.error);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('dashboard_cv_cache');
      }
    }, 1000);
  }, []);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const res = await getCVData();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Update Config
  const updateConfig = (updates: Partial<CVConfig>) => {
    setData((prev) => {
      if (!prev) return prev;
      const newConfig = { ...prev.config, ...updates };
      debouncedSaveConfig(newConfig);
      return { ...prev, config: newConfig };
    });
  };

  // Toggle Visibility of specific items (e.g., project ID)
  const toggleVisibility = (itemId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const hidden = prev.config.hiddenItems;
      const isHidden = hidden.includes(itemId);
      const newHidden = isHidden
        ? hidden.filter((id) => id !== itemId)
        : [...hidden, itemId];
      
      const newConfig = { ...prev.config, hiddenItems: newHidden };
      debouncedSaveConfig(newConfig);
      return { ...prev, config: newConfig };
    });
  };

  // Update Portfolio (Data Text)
  const updatePortfolio = (updates: Partial<PortfolioData>) => {
    setData((prev) => {
      if (!prev) return prev;
      const newPortfolio = { ...prev.portfolio, ...updates };
      debouncedSavePortfolio(newPortfolio);
      return { ...prev, portfolio: newPortfolio };
    });
  };

  return {
    data,
    isLoading,
    updateConfig,
    updatePortfolio,
    toggleVisibility,
  };
}
