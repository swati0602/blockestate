with open(r'd:\BlockEstate\client\PageComponents\Components\Product.jsx', encoding='utf-8-sig', errors='replace') as f:
    content = f.read()

old_str = "onClick={() => router.push(source ? `/detail?property=${card.id}` : \"product-details.html\")}"
replace_str = "onClick={() => router.push(`/detail?property=${card.id}`)}"

result = content.replace(old_str, replace_str)
if result != content:
    print("replaced successfully")
else:
    print("NOT FOUND - check string")

with open(r'd:\BlockEstate\client\PageComponents\Components\Product.jsx', 'w', encoding='utf-8') as f:
    f.write(result)
