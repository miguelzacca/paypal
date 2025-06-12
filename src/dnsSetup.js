import fs from 'node:fs'

const dnspath = 'c:/windows/system32/drivers/etc/hosts'
const filedata = fs.readFileSync(dnspath).toString()

function main() {
  if (filedata.includes('www.paypal.com')) {
    console.log('Exists')
    return
  }

  fs.appendFileSync(dnspath, '\n127.0.0.1 www.paypal.com\n127.0.0.1 paypal.com')
  console.log('Success')
}
main()
