// Kontode seadistus (Supabase). Juhend: rahaeesmark/KONTOD.md
// Täida mõlemad väljad oma Supabase'i projekti andmetega (Project Settings → API).
// "anon public" võti on mõeldud avalikuks kasutamiseks – andmeid kaitsevad andmebaasi reeglid (Row Level Security).
// Kui väljad on tühjad, töötab äpp ilma kontodeta: andmed hoitakse ainult brauseris.
window.RAHA_CONFIG = {
  supabaseUrl: "",      // nt "https://abcdefghijkl.supabase.co"
  supabaseAnonKey: ""   // nt "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};
