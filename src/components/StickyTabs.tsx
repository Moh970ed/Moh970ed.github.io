import React, { Children, isValidElement } from 'react';
import clsx from 'clsx';

export interface StickyTabItemProps {
  title: string;
  num?: string;
  id: string | number;
  accentClass?: string;
  borderClass?: string;
  glowClass?: string;
  children: React.ReactNode;
}

const StickyTabItem: React.FC<StickyTabItemProps> = () => null;

interface StickyTabsProps {
  children: React.ReactNode;
  navHeight?: string;
}

const StickyTabs: React.FC<StickyTabsProps> & { Item: React.FC<StickyTabItemProps> } = ({
  children,
  navHeight = '72px',
}) => {
  const stickyTop = `calc(${navHeight} - 1px)`;

  return (
    <div className="overflow-clip">
      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) return null;

        const item = child as React.ReactElement<StickyTabItemProps>;
        const {
          title,
          num,
          id,
          accentClass = 'text-primary',
          borderClass = 'border-primary/40',
          glowClass = 'glow-primary',
          children: content,
        } = item.props;

        return (
          <section key={id} className="relative">
            {/* Sticky title header */}
            <div
              className={clsx(
                'sticky z-20 -mt-px',
                'border-b border-t border-white/10',
                'bg-background/90 backdrop-blur-md',
              )}
              style={{ top: stickyTop }}
            >
              <div className="mx-auto max-w-7xl px-6 md:px-12 py-4 flex items-center gap-5">
                {num && (
                  <>
                    <span className={clsx('font-mono text-sm tracking-widest opacity-60', accentClass)}>{num}</span>
                    <div className={clsx('w-[1px] h-6 opacity-40', borderClass)} />
                  </>
                )}
                <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter text-white">
                  {title}
                </h2>
                <div className={clsx('flex-1 h-[1px] ml-2 opacity-20', borderClass)} />
                <div className={clsx(
                  'w-2 h-2 rounded-full animate-pulse',
                  accentClass.replace('text-', 'bg-').replace('/40', '').replace('/60', '')
                )} />
              </div>
              {/* Neon bottom line */}
              <div className={clsx('absolute bottom-0 left-0 w-full h-[1px] opacity-50', glowClass)} />
            </div>

            {/* Section content */}
            <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
              {content}
            </div>
          </section>
        );
      })}
    </div>
  );
};

StickyTabs.Item = StickyTabItem;
export default StickyTabs;
