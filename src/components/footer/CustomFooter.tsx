import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomFooter.css';

function CustomHeader() {
  return (
    <footer className="text-white py-5 footer">
      <div className="container contei">
        <div className="row">
          <div className="col-md-4">
            <h2>
              Self Waiter <i className="bi bi-cup-hot" style={{ fontSize: '35px' }}></i>
            </h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed feugiat magna.</p>
          </div>
          <div className="col-md-2">
            <h3>Market</h3>
            <ul className="list-unstyled">
              <li><a href="#">Anasayfa</a></li>
              <li><a href="#">Hakkımızda</a></li>
              <li><a href="#">Ürünler</a></li>
              <li><a href="#">İletişim</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h3>Keşfet</h3>
            <ul className="list-unstyled">
              <li><a href="#">Anasayfa</a></li>
              <li><a href="#">Hakkımızda</a></li>
              <li><a href="#">Ürünler</a></li>
              <li><a href="#">İletişim</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h3>Bize Ulaşın</h3>
            <p>Adres: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Telefon: 123-456-7890</p>
            <p>Email: info@example.com</p>
          </div>
          <div className="col-md-2">
            <ul className="social-media-links">
              <li><a href="https://www.facebook.com/"><i className="bi bi-facebook"></i></a></li>
              <li><a href="https://www.twitter.com/"><i className="bi bi-twitter"></i></a></li>
              <li><a href="https://www.instagram.com/"><i className="bi bi-instagram"></i></a></li>
              <li><a href="https://www.pinterest.com/"><i className="bi bi-pinterest"></i></a></li>
              <li><a href="https://www.youtube.com/"><i className="bi bi-youtube"></i></a></li>
            </ul>
            <div className="input-group mb-3">
              <input
                id="email_50468606"
                className="form-control"
                type="email"
                autoComplete="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Enter your email"
                aria-invalid="true"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CustomHeader;
