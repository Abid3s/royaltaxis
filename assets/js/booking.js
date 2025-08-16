// Booking functionality
class BookingSystem {
  constructor() {
    this.form = document.getElementById('booking-form');
    this.priceDisplay = document.getElementById('price-display');
    this.successMessage = document.getElementById('success-message');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.form.addEventListener('input', this.calculatePrice.bind(this));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    this.showSuccessMessage();
    
    // Reset form
    this.form.reset();
    this.hidePrice();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }

  calculatePrice() {
    const pickup = this.form.pickup?.value;
    const dropoff = this.form.dropoff?.value;
    const passengers = parseInt(this.form.passengers?.value) || 1;
    const vehicleType = this.form.vehicle?.value;

    if (pickup && dropoff) {
      // Simple price calculation (in real app, this would be more sophisticated)
      let basePrice = 15;
      let distanceMultiplier = Math.random() * 20 + 5; // Simulate distance calculation
      let vehicleMultiplier = this.getVehicleMultiplier(vehicleType);
      let passengerMultiplier = passengers > 4 ? 1.2 : 1;

      let totalPrice = basePrice + (distanceMultiplier * vehicleMultiplier * passengerMultiplier);
      
      this.showPrice(totalPrice.toFixed(2));
    }
  }

  getVehicleMultiplier(vehicleType) {
    const multipliers = {
      'saloon': 1,
      'estate': 1.1,
      'mpv': 1.3,
      'wav': 1.4,
      '8-seater': 1.6,
      '16-seater': 2.2
    };
    return multipliers[vehicleType] || 1;
  }

  showPrice(price) {
    if (this.priceDisplay) {
      this.priceDisplay.textContent = `Estimated Price: £${price}`;
      this.priceDisplay.classList.add('show');
    }
  }

  hidePrice() {
    if (this.priceDisplay) {
      this.priceDisplay.classList.remove('show');
    }
  }

  showSuccessMessage() {
    if (this.successMessage) {
      this.successMessage.classList.add('show');
      setTimeout(() => {
        this.successMessage.classList.remove('show');
      }, 5000);
    }
  }
}

// Initialize booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BookingSystem();
});