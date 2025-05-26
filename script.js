// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Service switching
    const serviceButtons = document.querySelectorAll('.service-switch button');
    const bookingForm = document.getElementById('bookingForm');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            serviceButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Toggle form elements based on service
            const service = button.dataset.service;
            document.querySelector('.parcel-details').style.display = 
                service === 'parcel' ? 'block' : 'none';
            document.getElementById('seatSelection').style.display = 
                service === 'car' ? 'block' : 'none';
        });
    });

    // Seat selection
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            updatePrice();
        });
    });

    // Price calculation
    function updatePrice() {
        const basePrices = {
            johannesburg: 1200,
            pretoria: 1000,
            bloemfontein: 800
        };
        
        const destination = document.getElementById('destination').value;
        const selectedSeats = document.querySelectorAll('.seat.selected').length;
        const service = document.querySelector('.service-switch .active').dataset.service;
        
        let price = basePrices[destination] || 0;
        if(service === 'car') price *= selectedSeats;
        if(service === 'parcel') price *= 0.8;
        
        document.querySelector('.price-estimate').textContent = 
            `Estimated: ZAR ${price.toFixed(0)}`;
    }

    // Form validation
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add proper form validation here
        alert('Booking submitted successfully!\nOur team will contact you shortly.');
        bookingForm.reset();
        seats.forEach(seat => seat.classList.remove('selected'));
    });

    // Dynamic price updates
    document.getElementById('destination').addEventListener('change', updatePrice);
    serviceButtons.forEach(button => {
        button.addEventListener('click', updatePrice);
    });
});