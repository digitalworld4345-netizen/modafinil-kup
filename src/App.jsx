import React, { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "Polska",
    street: "",
    street2: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "admin@modafinil-kup.pl",
    notes: "",
  });

  // === PRODUCT DATA WITH YOUR EXACT SEO & PRICING ===
  const products = [
    {
      id: 1,
      name: "Artvigil 150mg",
      category: "Armodafinil",
      image: "/images/artvigil-150mg.webp",
      slug: "artvigil-150mg-w-polsce-kup-online",
      metaTitle: "Artvigil 150mg w Polsce – Kup Online | Modafinil-kup",
      metaDesc:
        "Artvigil – sprawdź dawkowanie, ceny i opinie. Bezpieczny zakup online w Polsce. Skuteczny wspomagacz koncentracji i energii",
      anchor: "Artvigil 150mg w Polsce – Kup Online",
      dosage: "150 mg",
      manufacturer: "Sun Pharma",
      uses: "Poprawa koncentracji, leczenie nadmiernej senności",
      warning: "Dla osób pełnoletnich. Niezamienne na receptę.",
      prices: [
        { count: 10, price: 80 },
        { count: 20, price: 172 },
        { count: 30, price: 252 },
        { count: 50, price: 400 },
        { count: 100, price: 600 },
        { count: 200, price: 800 },
      ],
    },
    {
      id: 2,
      name: "Waklert 150mg",
      category: "Armodafinil",
      image: "/images/waklert-150mg.webp",
      slug: "waklert-150-mg-skuteczny-modafinil-w-polsce",
      metaTitle: "Waklert 150 mg – Skuteczny Modafinil w Polsce | Modafinil-kup",
      metaDesc:
        "Waklert 150 mg to wysokiej jakości modafinil. Szybka dostawa do Polski, gwarantowana skuteczność. Zamów teraz",
      anchor: "Waklert 150 mg – Skuteczny Modafinil w Polsce",
      dosage: "150 mg",
      manufacturer: "Sun Pharma",
      uses: "Poprawa czujności i efektywności",
      warning: "Nie dla kobiet w ciąży. Konsultacja z lekarzem zalecana.",
      prices: [
        { count: 10, price: 100 },
        { count: 20, price: 232 },
        { count: 30, price: 342 },
        { count: 50, price: 450 },
        { count: 100, price: 700 },
        { count: 200, price: 1000 },
      ],
    },
    {
      id: 3,
      name: "Modalert 200mg",
      category: "Modafinil",
      image: "/images/modalert-200mg.webp",
      slug: "modalert-200mg-dostepny-w-polsce",
      metaTitle: "Modalert 200mg 💊 | Dostępny w Polsce | Szybka wysyłka",
      metaDesc:
        "Modalert 200mg – sprawdzony modafinil na czujność. Bezpieczna dostawa w Polsce, dyskiretne opakowanie. Zamów teraz i odbierz szybko!",
      anchor: "Modalert 200mg 💊 | Dostępny w Polsce",
      dosage: "200 mg",
      manufacturer: "Sun Pharma",
      uses: "Leczenie bezsenności, poprawa koncentracji",
      warning: "Nie łączyć z alkoholem. Dla dorosłych.",
      prices: [
        { count: 10, price: 70 },
        { count: 20, price: 132 },
        { count: 30, price: 192 },
        { count: 50, price: 300 },
        { count: 100, price: 500 },
        { count: 200, price: 800 },
      ],
    },
    {
      id: 4,
      name: "Modvigil 200mg",
      category: "Modafinil",
      image: "/images/modvigil-200mg.webp",
      slug: "modvigil-200mg-szybka-dostawa-w-polsce",
      metaTitle: "Modvigil 200mg 💊 | Szybka Dostawa w Polsce ⚡",
      metaDesc:
        "Modvigil 200mg w niskiej cenie z dostawą w Polsce. ⚡ Szybka wysyłka, dyskretne opakowanie. Sprawdź teraz!",
      anchor: "Modvigil 200mg 💊 | Szybka Dostawa w Polsce ⚡",
      dosage: "200 mg",
      manufacturer: "Vignatech",
      uses: "Walka z przewlekłą sennością, poprawa wydajności",
      warning: "Nie dla osób z chorobami serca. Pełnoletni tylko.",
      prices: [
        { count: 10, price: 70 },
        { count: 20, price: 132 },
        { count: 30, price: 192 },
        { count: 50, price: 300 },
        { count: 100, price: 400 },
        { count: 200, price: 600 },
      ],
    },
  ];

  const addToCart = (product, pack, quantity = 1) => {
    const item = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      pack: pack.count,
      price: pack.price,
      quantity,
      image: product.image,
    };
    setCart([...cart, item]);
    alert(`${product.name} (opakowanie: ${pack.count} szt.) dodano do koszyka!`);
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      customer: checkoutForm,
      cart,
      shippingFee: 44,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 44,
    };

    try {
      const res = await fetch("/.netlify/functions/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      alert(`Dziękujemy! Twoje zamówienie ${result.orderId} zostało złożone. Wkrótce się z Tobą skontaktujemy.`);
      setCart([]);
      setCurrentView("thankyou");
    } catch (err) {
      alert("Błąd podczas składania zamówienia. Spróbuj ponownie.");
      console.error(err);
    }
  };

  const polishCities = [
    "Warszawa", "Kraków", "Wrocław", "Łódź", "Poznań", "Gdańsk", "Szczecin",
    "Bydgoszcz", "Katowice", "Białystok", "Częstochowa", "Gliwice", "Kielce",
    "Opole", "Rzeszów", "Sosnowiec", "Tarnów", "Toruń", "Zabrze", "Zamość", "Zielona Góra"
  ];

  // Sidebar Component
  const Sidebar = () => (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 to-black text-white p-6 z-50 border-r border-blue-500">
      <h1
        onClick={() => setCurrentView("home")}
        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8 cursor-pointer"
      >
        Modafinil-kup
      </h1>
      <h2 className="text-lg font-semibold mb-6 text-blue-300 border-b border-blue-500 pb-2">
        PRODUKTY
      </h2>
      <ul className="space-y-4">
        {products.map((product) => {
          const icon = product.name.includes("Modalert")
            ? "💊"
            : product.name.includes("Modvigil")
            ? "⚡"
            : product.name.includes("Waklert")
            ? "👤"
            : "🌶️";

          return (
            <li key={product.id}>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentView("product");
                }}
                className="flex items-center gap-3 hover:text-purple-300 transition"
              >
                <span>{icon}</span>
                <span className="text-sm">{product.name.split(" ")[0]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // Cart Dropdown
  const CartDropdown = () => (
    <div
      className={`absolute right-0 top-16 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out ${
        isCartOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-4">
        <h3 className="font-bold text-yellow-300">Twój koszyk</h3>
        {cart.length === 0 ? (
          <p className="text-gray-400 mt-2">Brak produktów</p>
        ) : (
          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm">{item.name} x{item.quantity}</span>
                <span className="text-green-400 font-medium">
                  {item.price * item.quantity} zł
                </span>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Dostawa:</span>
                <span>44 zł</span>
              </div>
              <div className="flex justify-between font-bold mt-1">
                <span>Razem:</span>
                <span className="text-green-400">
                  {cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 44} zł
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setCurrentView("cart");
              setIsCartOpen(false);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-purple-600 transition"
          >
            Przejdź do płatności
          </button>
        </div>
      </div>
    </div>
  );

  // Views
  const renderHome = () => (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Sidebar />
      <div className="ml-64 p-8">
        <div
          className="h-screen flex items-center justify-center text-center px-4 relative"
          style={{
            backgroundImage: 'url("https://i.imgur.com/8nKoPqT.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Modafinil-kup.pl
            </h1>
            <p className="mt-6 text-2xl opacity-90">
              Skuteczne leki na czujność i koncentracji
            </p>
            <p className="mt-2 text-lg opacity-80">
              ⚡ Szybka, dyskretna dostawa w całej Polsce
            </p>
            <button
              onClick={() => setCurrentView("products")}
              className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full font-bold hover:from-blue-500 hover:to-purple-600 transition transform hover:scale-105"
            >
              Kup Teraz
            </button>
          </div>
        </div>

        {/* Featured Products */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Nasze Produkty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.anchor}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/300x200/0f172a/3b82f6?text=Produkt";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-400">{product.category}</p>
                    <p className="mt-3 text-lg">
                      <span className="text-green-400">
                        od {product.prices[0].price} zł
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentView("product");
                      }}
                      className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition"
                    >
                      Zobacz produkt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderProduct = () => {
    const product = selectedProduct;
    if (!product) return renderHome();

    return (
      <div className="min-h-screen bg-black text-white relative">
        <Sidebar />
        <div className="ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setCurrentView("home")}
              className="text-blue-400 hover:underline mb-8 inline-block"
            >
              &laquo; Wróć do strony głównej
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="rounded-2xl overflow-hidden border border-gray-700">
                <img
                  src={product.image}
                  alt={product.anchor}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/500x400/0f172a/3b82f6?text=Produkt";
                  }}
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-blue-300">
                  {product.name}
                </h1>
                <p className="text-gray-400 mt-2">Kategoria: {product.category}</p>
                <p className="mt-4 text-lg opacity-90">{product.metaDesc}</p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    📦 Wybierz opakowanie:
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.prices.map((pack) => (
                      <div
                        key={pack.count}
                        className="bg-gray-900 border border-gray-600 rounded-xl p-4 hover:border-blue-500 transition"
                      >
                        <div className="font-medium">{pack.count} tablet</div>
                        <div className="text-green-400 font-bold text-lg">
                          {pack.price} zł
                        </div>
                        <button
                          onClick={() => addToCart(product, pack, 1)}
                          className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition"
                        >
                          Dodaj do koszyka
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 p-6 bg-gray-900 border border-gray-700 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4">ℹ️ Szczegóły produktu</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <strong>🔹 Dawkowanie:</strong> {product.dosage}
                    </li>
                    <li>
                      <strong>🔹 Producent:</strong> {product.manufacturer}
                    </li>
                    <li>
                      <strong>🔹 Zastosowanie:</strong> {product.uses}
                    </li>
                    <li>
                      <strong>🔹 Uwaga:</strong>{" "}
                      <span className="text-red-400">{product.warning}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="min-h-screen bg-black text-white relative">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">🛒 Twój koszyk</h1>
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl opacity-70">Twój koszyk jest pusty.</p>
              <button
                onClick={() => setCurrentView("home")}
                className="mt-6 text-blue-400 hover:underline"
              >
                Przejdź do zakupów
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-6 mb-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 bg-gray-900 p-4 rounded-2xl border border-gray-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80/0f172a/3b82f6?text=P";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-300">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.pack} szt.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-gray-700"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-bold text-green-400">
                      {item.price * item.quantity} zł
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 ml-4"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">🚚 Sposób dostawy</h3>
                <p><strong>Płatność przy odbiorze</strong> (za pobraniem)</p>
                <p className="mt-2">Koszt dostawy: <strong>44 zł</strong></p>
              </div>

              <div className="flex justify-between items-center text-2xl font-bold border-t border-gray-700 pt-6">
                <span>Łączna kwota:</span>
                <span className="text-green-400">
                  {cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 44} zł
                </span>
              </div>

              <div className="mt-8 flex gap-6">
                <button
                  onClick={() => setCurrentView("home")}
                  className="flex-1 py-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition"
                >
                  Kontynuuj zakupy
                </button>
                <button
                  onClick={() => setCurrentView("checkout")}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-600 transition"
                >
                  Przejdź do płatności
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="min-h-screen bg-black text-white relative">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">💳 Zamówienie</h1>
          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm opacity-80">
                  Imię *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.firstName}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm opacity-80">
                  Nazwisko *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.lastName}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Nazwa firmy (opcjonalne)
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.company}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      company: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Kraj / region *
                </label>
                <select
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.country}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      country: e.target.value,
                    })
                  }
                >
                  <option value="Polska">Polska</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Ulica *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  placeholder="Nazwa ulicy, numer budynku / numer lokalu"
                  value={checkoutForm.street}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      street: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Ciąg dalszy adresu (opcjonalnie)
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  placeholder="np. blok B, piętro 3"
                  value={checkoutForm.street2}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      street2: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Kod pocztowy *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.postalCode}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Miasto *
                </label>
                <select
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.city}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      city: e.target.value,
                    })
                  }
                >
                  <option value="">Wybierz miasto</option>
                  {polishCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Numer telefonu *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.phone}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Adres e-mail *
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  value={checkoutForm.email}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm opacity-80">
                  Uwagi do zamówienia (opcjonalne)
                </label>
                <textarea
                  className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:border-blue-500 outline-none transition"
                  rows="4"
                  value={checkoutForm.notes}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      notes: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-10 p-6 bg-gray-900 border border-gray-700 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">📋 Podsumowanie zamówienia</h2>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-gray-700 pb-1"
                  >
                    <span>
                      {item.name} ({item.pack} szt.) x {item.quantity}
                    </span>
                    <span>{item.price * item.quantity} zł</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <span>Dostawa:</span>
                  <span>44 zł</span>
                </div>
              </div>
              <div className="font-bold text-xl text-green-400">
                Razem:{" "}
                {cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 44} zł
              </div>
              <p className="text-blue-400 mt-2">płatność przy odbiorze</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl font-bold text-lg hover:from-blue-500 hover:to-purple-600 transition"
            >
              🚀 Kupuję i płacę
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderThankYou = () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-4">🎉</div>
        <h1 className="text-5xl font-bold text-green-400 mb-4">Dziękujemy!</h1>
        <p className="text-xl opacity-90">
          Skontaktujemy się z Tobą pod adresem{" "}
          <strong>admin@modafinil-kup.pl</strong> w celu potwierdzenia dostawy.
        </p>
        <button
          onClick={() => setCurrentView("home")}
          className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition"
        >
          Wróć do strony głównej
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-64 right-0 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800 z-40">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Modafinil-kup.pl
          </h1>
          <div className="relative">
            <button
              onClick={() => setCurrentView("cart")}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition"
            >
              <span>Koszyk</span>
              {cart.length > 0 && (
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.length}
                </span>
              )}
            </button>
            {isCartOpen && <CartDropdown />}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        {currentView === "home" && renderHome()}
        {currentView === "product" && renderProduct()}
        {currentView === "cart" && renderCart()}
        {currentView === "checkout" && renderCheckout()}
        {currentView === "thankyou" && renderThankYou()}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-gray-500 py-6 text-center text-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold text-blue-400">Modafinil-kup.pl</h3>
          <p className="mt-2">⚡ Szybka, dyskretna dostawa w całej Polsce</p>
          <p className="mt-4">📧 Kontakt: admin@modafinil-kup.pl</p>
          <p className="mt-6 opacity-60">
            © 2025 Modafinil-kup. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;