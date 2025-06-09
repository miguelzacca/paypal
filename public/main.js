setTimeout(() => {
  Array.from(document.querySelectorAll('script')).map((el) => el.remove())

  document.querySelector(
    '#reactContainer__balance > div > div > div.test_balance-tile-currency.css-1aq3bmv-text_heading_lg',
  ).textContent = 'R$ 9.865.098,25'
}, 1000)
