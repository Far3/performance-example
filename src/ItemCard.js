import { memo } from 'react';

// GOOD: Memoized component - only re-renders when props change
const ItemCard = memo(({ item }) => {
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
      <button style={{ 
        padding: '8px 16px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Add to Cart
      </button>
    </div>
  );
});

export default ItemCard;