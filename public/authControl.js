function main() {
  const prevUrl = sessionStorage.getItem('prevUrl')
  const currentUrl = location.href

  if (!currentUrl.includes('signin') && prevUrl.includes('signin')) {
    location.replace(prevUrl)
    return
  }

  sessionStorage.setItem('prevUrl', currentUrl)
}
main()
