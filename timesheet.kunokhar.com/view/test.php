<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="generate-pdf">
        <img src="../public/img/kunokharK.png" alt="">
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script>
        var pdf = new jsPDF('p', 'pt', 'a4');
        window.html2canvas = html2canvas
        pdf.html(document.getElementsByClassName('generate-pdf')[0], {
                callback: function (pdf) {
                    pdf.save('DOC.pdf');
                }
            })  
    </script>
</body>
</html>