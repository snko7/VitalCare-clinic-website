document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.site-search');
  if (!forms.length) return;

  function normalize(str) {
    return (str || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  const suggestionsData = [
    // Doctors
    {
      type: 'doctor',
      label: 'MUDr. Anna Nováková',
      subtitle: 'Internal medicine • preventive care',
      url: 'doctor-anna.html'
    },
    {
      type: 'doctor',
      label: 'MUDr. Pavel Černý',
      subtitle: 'Pediatrics • family medicine',
      url: 'doctor-pavel.html'
    },
    {
      type: 'doctor',
      label: 'Mgr. Jana Králová',
      subtitle: 'Physiotherapy • rehabilitation',
      url: 'doctor-jana.html'
    },
    {
      type: 'doctor',
      label: 'MUDr. Tomáš Svoboda',
      subtitle: 'Orthopedics • sports injuries',
      url: 'doctor-tomas.html'
    },
    {
      type: 'doctor',
      label: 'MUDr. David Horák',
      subtitle: 'Cardiology • heart disease',
      url: 'doctor-david.html'
    },
    {
      type: 'doctor',
      label: 'MUDr. Petra Malá',
      subtitle: 'Neurology • headaches & dizziness',
      url: 'doctor-petra.html'
    },
    {
      type: 'doctor',
      label: 'MUDr. Eva Dvořáková',
      subtitle: 'Gynecology • women’s health',
      url: 'doctor-eva.html'
    },
    {
      type: 'doctor',
      label: 'MUDr. Martin Veselý',
      subtitle: 'Dermatology • skin & allergy',
      url: 'doctor-martin.html'
    },

    // Departments
    {
      type: 'department',
      label: 'General Practice & Internal Medicine',
      subtitle: 'Department • first contact for adults',
      url: 'department-general-practice.html'
    },
    {
      type: 'department',
      label: 'Pediatrics',
      subtitle: 'Department • care for children and adolescents',
      url: 'department-pediatrics.html'
    },
    {
      type: 'department',
      label: 'Cardiology',
      subtitle: 'Department • heart and vascular diseases',
      url: 'department-cardiology.html'
    },
    {
      type: 'department',
      label: 'Orthopedics',
      subtitle: 'Department • joints, bones and ligaments',
      url: 'department-orthopedics.html'
    },
    {
      type: 'department',
      label: 'Rehabilitation & Physiotherapy',
      subtitle: 'Department • recovery after injuries or surgery',
      url: 'department-rehabilitation.html'
    },
    {
      type: 'department',
      label: 'Neurology',
      subtitle: 'Department • headaches, dizziness and neuropathies',
      url: 'department-neurology.html'
    },
    {
      type: 'department',
      label: 'Gynecology',
      subtitle: 'Department • women’s health and screening',
      url: 'department-gynecology.html'
    },
    {
      type: 'department',
      label: 'Dermatology',
      subtitle: 'Department • skin, hair and nail care',
      url: 'department-dermatology.html'
    }
  ];

  forms.forEach(function (form) {
    const input = form.querySelector('input[type="search"]');
    if (!input) return;

    input.setAttribute('autocomplete', 'off');

    const list = document.createElement('div');
    list.className = 'search-suggestions';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    form.appendChild(list);

    function clearSuggestions() {
      list.innerHTML = '';
      list.hidden = true;
    }

    function buildSuggestions(value) {
      const q = normalize(value);
      if (!q) {
        clearSuggestions();
        return;
      }

      const matches = suggestionsData
        .filter(function (item) {
          return normalize(item.label).includes(q);
        })
        .slice(0, 6); // max 6 suggestions

      if (!matches.length) {
        clearSuggestions();
        return;
      }

      list.innerHTML = '';
      matches.forEach(function (item) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'search-suggestion-item';
        button.setAttribute('role', 'option');

        const icon = document.createElement('span');
        icon.className = 'search-suggestion-icon';
        icon.innerHTML = item.type === 'doctor'
          ? '<i class="fa-solid fa-user-doctor"></i>'
          : '<i class="fa-solid fa-hospital"></i>';

        const textWrapper = document.createElement('span');
        textWrapper.className = 'search-suggestion-text';

        const main = document.createElement('span');
        main.className = 'search-suggestion-main';
        main.textContent = item.label;

        const sub = document.createElement('span');
        sub.className = 'search-suggestion-sub';
        sub.textContent = item.subtitle;

        textWrapper.appendChild(main);
        textWrapper.appendChild(sub);

        button.appendChild(icon);
        button.appendChild(textWrapper);

        button.addEventListener('click', function () {
          window.location.href = item.url;
        });

        list.appendChild(button);
      });

      list.hidden = false;
    }

    input.addEventListener('input', function () {
      buildSuggestions(input.value);
    });

    input.addEventListener('blur', function () {
      // small delay so click on suggestion still works
      setTimeout(clearSuggestions, 150);
    });

    form.addEventListener('submit', function () {
      clearSuggestions();
    });
  });
});
