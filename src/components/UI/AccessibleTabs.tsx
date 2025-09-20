import React, { useState, useRef, useEffect } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface AccessibleTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
  onTabChange?: (tabId: string) => void;
}

const AccessibleTabs: React.FC<AccessibleTabsProps> = ({
  tabs,
  defaultTab,
  orientation = 'horizontal',
  variant = 'default',
  className = '',
  onTabChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [focusedTab, setFocusedTab] = useState(activeTab);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const tabsId = useRef(`tabs-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  const handleTabClick = (tabId: string) => {
    if (tabs.find(tab => tab.id === tabId)?.disabled) return;
    setActiveTab(tabId);
    setFocusedTab(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const enabledTabs = tabs.filter(tab => !tab.disabled);
    const currentIndex = enabledTabs.findIndex(tab => tab.id === focusedTab);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = orientation === 'horizontal' 
          ? (currentIndex + 1) % enabledTabs.length
          : currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : currentIndex;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = orientation === 'horizontal'
          ? currentIndex === 0 ? enabledTabs.length - 1 : currentIndex - 1
          : currentIndex > 0 ? currentIndex - 1 : currentIndex;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = enabledTabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setActiveTab(tabId);
        return;
      default:
        return;
    }

    const newTabId = enabledTabs[newIndex]?.id;
    if (newTabId) {
      setFocusedTab(newTabId);
      tabRefs.current[newTabId]?.focus();
    }
  };

  const getTabClasses = (tab: Tab) => {
    const baseClasses = 'relative flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const isActive = activeTab === tab.id;
    const isFocused = focusedTab === tab.id;
    
    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-lg ${
          isActive
            ? 'bg-green-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
        }`;
      case 'underline':
        return `${baseClasses} border-b-2 ${
          isActive
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-600 hover:text-green-600 hover:border-gray-300'
        }`;
      default:
        return `${baseClasses} rounded-t-lg border border-b-0 ${
          isActive
            ? 'bg-white text-green-600 border-gray-300 border-b-white'
            : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100'
        }`;
    }
  };

  const getContentClasses = () => {
    switch (variant) {
      case 'pills':
      case 'underline':
        return 'mt-6';
      default:
        return 'bg-white border border-gray-300 border-t-0 rounded-b-lg p-6';
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      {/* Tab list */}
      <div
        ref={tabListRef}
        className={`flex ${
          orientation === 'vertical' 
            ? 'flex-col space-y-1' 
            : variant === 'underline'
            ? 'space-x-8 border-b border-gray-200'
            : 'space-x-1'
        }`}
        role="tablist"
        aria-orientation={orientation}
        aria-label="Tab navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              ref={el => tabRefs.current[tab.id] = el}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              disabled={tab.disabled}
              className={getTabClasses(tab)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabsId.current}-panel-${tab.id}`}
              id={`${tabsId.current}-tab-${tab.id}`}
              tabIndex={focusedTab === tab.id ? 0 : -1}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.badge}
                </span>
              )}
              
              {/* Active indicator for screen readers */}
              {isActive && (
                <span className="sr-only">current tab</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className={getContentClasses()}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`${tabsId.current}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${tabsId.current}-tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
            className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>

      {/* Alternative navigation for screen readers */}
      <details className="mt-4">
        <summary className="text-sm text-gray-600 cursor-pointer hover:text-green-600 transition-colors">
          Alternative navigation (for screen readers)
        </summary>
        <div className="mt-2 space-y-2">
          {tabs.map((tab) => (
            <button
              key={`alt-${tab.id}`}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
              className={`block w-full text-left p-3 rounded-lg border transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{tab.label}</div>
              {tab.badge && (
                <span className="text-xs text-gray-500">({tab.badge} items)</span>
              )}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
};

export default AccessibleTabs;