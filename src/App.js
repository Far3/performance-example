import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');

  // BAD: Expensive calculation on every render
  const generateItems = () => {
    const items = [];
    for (let i = 0; i < 5000; i++) {
      items.push({
        id: i,
        name: `Item ${i}`,
        description: `This is a long description for item ${i} that contains a lot of text to make the DOM heavy`,
        price: (Math.random() * 1000).toFixed(2),
        category: ['Electronics', 'Books', 'Clothing', 'Food'][Math.floor(Math.random() * 4)]
      });
    }
    return items;
  };

  // BAD: No memoization - recalculates every render
  const items = generateItems();

  // BAD: Inefficient filtering
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.description.toLowerCase().includes(filter.toLowerCase())
  );

  // BAD: Inline function creation on every render
  const handleClick = () => {
    console.log('Clicked!');
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header style={{ padding: '20px', background: '#282c34', color: 'white' }}>
        <h1>BEFORE Optimization - Slow React App</h1>
        <p>This app has intentional performance issues</p>
        <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Clicked {count} times
        </button>
      </header>
      
      {/* BAD: Huge unoptimized image loaded eagerly */}
      <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
        <img
          src="./hero-large.jpg"
          alt="Hero"
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

        <p>Showing {filteredItems.length} items (rendering ALL items - no virtualization)</p>

        {/* BAD: Rendering 5000+ items with no virtualization */}
        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// BAD: Not memoized - re-renders on every parent update
function ItemCard({ item }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '4px'
    }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <p><strong>Category:</strong> {item.category}</p>
      {/* BAD: Inline styles recalculated every render */}
      <button style={{ 
        padding: '8px 16px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Add to Cart
      </button>
    </div>
  );
}

export default App;