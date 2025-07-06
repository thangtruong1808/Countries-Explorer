import React from 'react';
import { NavBar, SideNav } from '../../components';
import type { Continent, Country } from '../../types';

interface HomeTabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isSideNavOpen: boolean;
  onFiltersToggle: () => void;
  onSideNavClose: () => void;
  continents: Continent[];
  countries: Country[];
  selectedContinents: string[];
  selectedLanguages: string[];
  selectedCurrencies: string[];
  onContinentToggle: (code: string) => void;
  onLanguageToggle: (lang: string) => void;
  onCurrencyToggle: (currency: string) => void;
  onResetFilters: () => void;
}

/**
 * Renders the NavBar and SideNav for tab navigation and filtering.
 */
export const HomeTabs: React.FC<HomeTabsProps> = ({
  currentTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  isSideNavOpen,
  onFiltersToggle,
  onSideNavClose,
  continents,
  countries,
  selectedContinents,
  selectedLanguages,
  selectedCurrencies,
  onContinentToggle,
  onLanguageToggle,
  onCurrencyToggle,
  onResetFilters
}) => (
  <>
    <NavBar
      currentTab={currentTab}
      onTabChange={onTabChange}
      isDarkMode={isDarkMode}
      onToggleTheme={onToggleTheme}
      onFiltersToggle={onFiltersToggle}
    />
    {currentTab === 'filters' && (
      <SideNav
        continents={continents}
        countries={countries}
        selectedContinents={selectedContinents}
        selectedLanguages={selectedLanguages}
        selectedCurrencies={selectedCurrencies}
        onContinentToggle={onContinentToggle}
        onLanguageToggle={onLanguageToggle}
        onCurrencyToggle={onCurrencyToggle}
        onResetFilters={onResetFilters}
        isOpen={isSideNavOpen}
        onClose={onSideNavClose}
      />
    )}
  </>
); 