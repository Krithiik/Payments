import "./App.css";

var key;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

if (process.env.NODE_ENV !== "production") {
  key = process.env.REACT_APP_DEV_KEY_ID;
} else {
  //set key to production key
}

function App() {
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("no no no no no no");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);
    const options = {
      key: key,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "http://localhost:1337/logo.svg",
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay ₹5
        </a>
      </header>
    </div>
  );
}

export default App;
