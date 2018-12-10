/* Kalenderen og dens system/funktionalitet */
var vanillaCalendar = {
    month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    today: document.querySelectorAll('[data-calendar-toggle="today"]')[0],
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    currentMonth: null,
    currentYear: null,
    activeDates: null,
    date: new Date,
    todaysDate: new Date,
    init: function (t) {
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.options = t, this.date.setDate(1), this.createMonth(), this.createListeners();

        var dateOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }

        document.querySelectorAll('[data-calendar-label="picked"]')[0].innerHTML = this.todaysDate.toLocaleDateString('da-DK', dateOptions);
    },
    createListeners: function () {
        var t = this;
        this.next.addEventListener("click", function () {
                t.clearCalendar();
                var e = t.date.getMonth() + 1;
                t.date.setMonth(e), t.createMonth()
            }),
            this.previous.addEventListener("click", function () {
                t.clearCalendar();
                var e = t.date.getMonth() - 1;
                t.date.setMonth(e), t.createMonth()
            }),
            this.today.addEventListener("click", function () {
                t.clearCalendar();
                t.date.setMonth(t.currentMonth);
                t.date.setFullYear(t.currentYear);
                t.createMonth();
                var dateOptions = {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                }

                document.querySelectorAll('[data-calendar-label="picked"]')[0].innerHTML = t.todaysDate.toLocaleDateString('da-DK', dateOptions)
            })
    },
    createDay: function (t, e, a) {
        /* 
         Jeg har en idé om at der måske skal en
         enkelt kildehevisning til det her. 
         This be complicated, here be dragons...
        */
        var n = document.createElement("div"),
            s = document.createElement("span");
        s.innerHTML = t, n.className = "vcal-date", n.setAttribute("data-calendar-date", this.date),
            /* 1 === t && osv. Det der sker i denne sætning er hvis e er = 0 så skal beregningen mellem ? og : udføres, ellers skal det efter : udføres */
            1 === t && (n.style.marginLeft = 0 === e ? 6 * 14.28 + "%" : 14.28 * (e - 1) + "%"), this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1 ? n.classList.add("vcal-date--disabled") : (n.classList.add("vcal-date--active"), n.setAttribute("data-calendar-status", "active")), this.date.toString() === this.todaysDate.toString() && n.classList.add("vcal-date--today"), n.appendChild(s), this.month.appendChild(n)
    },
    dateClicked: function () {
        var t = this;
        this.activeDates = document.querySelectorAll('[data-calendar-status="active"]');
        for (var e = 0; e < this.activeDates.length; e++) {
            this.activeDates[e].addEventListener("click", function (e) {
                var dateString = new Date(this.dataset.calendarDate);
                var options = {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                }
                document.querySelectorAll('[data-calendar-label="picked"]')[0].innerHTML = dateString.toLocaleDateString('da-DK', options), t.removeActiveClass(), this.classList.add("vcal-date--selected")
            })
        }
    },
    createMonth: function () {
        for (var t = this.date.getMonth(); this.date.getMonth() === t;) {
            this.createDay(this.date.getDate(), this.date.getDay(), this.date.getFullYear()), this.date.setDate(this.date.getDate() + 1);
        }
        this.date.setDate(1);
        this.date.setMonth(
            this.date.getMonth() - 1
        );
        this.label.innerHTML =
            this.monthsAsString(this.date.getMonth()) + " " + this.date.getFullYear();
        this.dateClicked();
    },
    monthsAsString: function (t) {
        return ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"][t]
    },
    clearCalendar: function () {
        vanillaCalendar.month.innerHTML = "";
    },
    removeActiveClass: function () {
        for (var t = 0; t < this.activeDates.length; t++)
            this.activeDates[t].classList.remove("vcal-date--selected")
    }
};
/*  Kilde til basic kalender https://www.cssscript.com/minimal-inline-calendar-date-picker-vanilla-javascript/ */

/* Reserver knappen - der åbner modal box og overlayer */
document.getElementById("reserver").addEventListener('click', () => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

//MODAL BOX JS
// When the user clicks on class="modalLuk", close the modal
document.getElementsByClassName("modalLuk")[0].addEventListener('click', () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});



//BEKRÆFT 
document.getElementById("confirm").addEventListener('click', () => {
    var navn = document.querySelector("#myForm [name=fullname]").value;
    var email = document.querySelector("#myForm [name=email]").value;
    var besked = document.querySelector("#myForm [name=comment]").value;

    var fra = document.getElementById('fra').value;
    var til = document.getElementById('til').value;
    var dato = document.querySelectorAll('[data-calendar-label="picked"]')[0].innerHTML;

    firebase.database().ref('reservationer').push({
        navn: navn,
        email: email,
        besked: besked,
        dato: dato,
        fra: fra,
        til: til
    });
});


/* Klokkeslet og dato bliver sendt videre over i modalboxen */
document.getElementById('reserver').addEventListener('click', () => {
    var fra = document.getElementById('fra').value;
    var til = document.getElementById('til').value;
    var dato = document.querySelectorAll('[data-calendar-label="picked"]')[0].innerHTML;

    document.getElementById('rFra').innerHTML = fra;
    document.getElementById('rTil').innerHTML = til;
    document.getElementById('dato').innerHTML = dato;
});