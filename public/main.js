setTimeout(async () => {
  Array.from(document.querySelectorAll('script')).map((el) => el.remove())

  const res = await fetch('https://www.paypal.com/api/balance')
  const data = await res.json()

  document.querySelector(
    '#reactContainer__balance > div > div > div.test_balance-tile-currency.css-1aq3bmv-text_heading_lg',
  ).textContent = `R$ ${data.balance}`
}, 1000)
