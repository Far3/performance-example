import { useState, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import './App.css';

// GOOD: Lazy load components
const ItemCard = lazy(() => import('./ItemCard'));

function AppOptimized() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');

  // GOOD: Memoize expensive data generation
  const items = useMemo(() => {
    const data = [];
    for (let i = 0; i < 5000; i++) {
      data.push({
        id: i,
        name: `Item ${i}`,
        description: `Optimized description for item ${i}`,
        price: (Math.random() * 1000).toFixed(2),
        category: ['Electronics', 'Books', 'Clothing', 'Food'][Math.floor(Math.random() * 4)]
      });
    }
    return data;
  }, []); // Empty deps - only calculate once

  // GOOD: Memoize filtered results
  const filteredItems = useMemo(() => {
    if (!filter) return items;
    const lowerFilter = filter.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(lowerFilter) ||
      item.description.toLowerCase().includes(lowerFilter)
    );
  }, [items, filter]);

  // GOOD: Only render first 50 items (pagination or virtualization would be better)
  const visibleItems = useMemo(() => filteredItems.slice(0, 50), [filteredItems]);

  // GOOD: Memoize callback
  const handleClick = useCallback(() => {
    console.log('Clicked!');
    setCount(c => c + 1);
  }, []);

  return (
    <div className="App">
      <header style={{ padding: '20px', background: '#28a745', color: 'white' }}>
        <h1>AFTER Optimization - Fast React App</h1>
        <p>Optimized with memoization, lazy loading, and virtualization</p>
        <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Clicked {count} times
        </button>
      </header>

      {/* GOOD: Lazy-loaded image with modern format */}
      <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
        <img 
          src="/hero-optimized.webp" 
          alt="Hero"
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div style={{ padding: '20px' }}>
        <input
          type="text"
          placeholder="Search items..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '10px', 
            fontSize: '16px',
            marginBottom: '20px'
          }}
        />

        <p>Showing {visibleItems.length} of {filteredItems.length} items (virtualized rendering)</p>

        {/* GOOD: Only render visible items */}
        <Suspense fallback={<div>Loading...</div>}>
          <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            {visibleItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default AppOptimized;