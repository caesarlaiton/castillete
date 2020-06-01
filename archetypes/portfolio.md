+++

title = "{{ replace .Name "-" " " | title }}"

date = {{ .Date }}

tags = []

img = "{{ .Name }}.jpg"

alt = ""

[_build]
	render = false

+++

