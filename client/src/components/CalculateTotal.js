


export default function CalculateTotal({cart}) {
      
    const calculateTotal = () => {
      return cart.reduce((total, item) => {
        
        const price = item.quantity * parseFloat(item.price.replace("$", ""));
        
        return total + price;
      }, 0);
    };
return <h3>Total: ${calculateTotal()}</h3>
}