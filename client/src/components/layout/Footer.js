import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Mail } from "react-feather"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Brushes and Beyond"
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/32x32?text=B&B"
                }}
              />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">Brushes and Beyond</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Handcrafted with love in India. Unique knitted flowers, custom keychains, and artistic products for your
              home and loved ones.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:info@brushesandbeyond.com"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop/crocheted-flowers"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Crocheted Flowers
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/keychains"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Custom Keychains
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/art-supplies"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Art Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/gift-sets"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/new-arrivals"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/sale"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for updates on new products, special offers, and artistic inspiration.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-green-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Brushes and Beyond. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

