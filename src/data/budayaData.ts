import budayaBetawiImg from '../assets/images/budaya_betawi_1792920782049.jpg';
import budayaBugisImg from '../assets/images/budaya_bugis_1792920783606.jpg';
import budayaMelayuRiauImg from '../assets/images/budaya_melayu_riau_1792920784608.jpg';
import budayaRoteImg from '../assets/images/budaya_rote_1792920786617.jpg';
import budayaAmbonImg from '../assets/images/budaya_ambon_1792920786616.jpg';

export enum AppView {
  Home = 'home',
  Comic = 'comic',
  Explorer = 'explorer',
  Quiz = 'quiz',
}

export interface SukuItem {
  id: string;
  nama: string;
  provinsi: string;
  wilayah: string;
  warnaHex: string;
  image: string;
  pakaianPria?: string;
  pakaianWanita?: string;
  pakaianRingkas: string;
  kuliner: string;
  budaya: string;
  fakta: string;
}

export interface ComicDialogueLine {
  penutur: string;
  teks: string;
}

export interface ComicPanelItem {
  nomor: number;
  judul: string;
  asalDaerah: string;
  percakapan: ComicDialogueLine[];
  catatanAlur: string;
}

export interface MatchingQuizItem {
  item: string;
  benar: string;
}

export interface MultipleChoiceQuizItem {
  id: number;
  q: string;
  options: string[];
  answer: number;
  pembahasan: string;
}

// Menggunakan langsung gambar asli komik "Kita Indonesia" tanpa dikurangi sedikit pun
export const KOMIK_IMAGE = '/assets/aistudio/image_327cc310.png';

export const KOMIK_PANELS: ComicPanelItem[] = [
  {
    nomor: 1,
    judul: 'Pakaian Adat Dewi',
    asalDaerah: 'Pembuka Cerita',
    percakapan: [
      { penutur: 'Dewi', teks: '“Dani, pakaianku bagus tidak?”' },
      { penutur: 'Dani', teks: '“Bagus sekali, Dewi. Pakaianmu dari daerah mana?”' },
    ],
    catatanAlur:
      'Dewi menyapa Dani sambil menunjukkan pakaian adat yang sedang ia kenakan, dan Dani memuji serta menanyakan asal daerah pakaian tersebut.',
  },
  {
    nomor: 2,
    judul: 'Baju Ning dari Jawa Timur',
    asalDaerah: 'Jawa Timur',
    percakapan: [
      { penutur: 'Made', teks: '“Itu dari Jawa Timur, namanya baju Ning. Benar tidak, Dewi?”' },
      { penutur: 'Dewi', teks: '“Ya, benar sekali Made.”' },
    ],
    catatanAlur:
      'Made mengenali pakaian adat yang dikenakan Dewi sebagai Baju Ning yang berasal dari Jawa Timur, dan Dewi membenarkannya.',
  },
  {
    nomor: 3,
    judul: 'Pakaian Suku Bugis dari Sulawesi Tengah',
    asalDaerah: 'Sulawesi Tengah',
    percakapan: [
      { penutur: 'Dewi', teks: '“Nah, pakaian kamu dari daerah mana?”' },
      { penutur: 'Dani', teks: '“Ini pakaian suku Bugis dari Sulawesi Tengah, Dew.”' },
    ],
    catatanAlur:
      'Bergantian Dewi bertanya kepada Dani, dan Dani menjelaskan bahwa ia mengenakan pakaian adat suku Bugis dari Sulawesi Tengah.',
  },
  {
    nomor: 4,
    judul: 'Pertunjukan Panggung dari Kalimantan Tengah',
    asalDaerah: 'Kalimantan Tengah',
    percakapan: [
      {
        penutur: 'Made',
        teks: '“Dani, kamu tahu yang sedang tampil di panggung itu dari daerah mana?”',
      },
      { penutur: 'Dani', teks: '“Itu dari Kalimantan Tengah, Made.”' },
    ],
    catatanAlur:
      'Made menunjuk ke arah pertunjukan budaya yang sedang tampil di panggung, dan Dani memberi tahu bahwa penampilan itu berasal dari Kalimantan Tengah.',
  },
  {
    nomor: 5,
    judul: 'Tari Mandau Suku Dayak & Tarian Khas Bali',
    asalDaerah: 'Kalimantan Tengah & Bali',
    percakapan: [
      {
        penutur: 'Dewi',
        teks: '“Benar Dani. Mereka sedang menampilkan tari mandau dari suku Dayak.”',
      },
      {
        penutur: 'Made',
        teks: '“Kalau dari daerahku, ada tari pendet, tari kecak, dan tari barong.”',
      },
    ],
    catatanAlur:
      'Dewi menambahkan bahwa penari di panggung membawakan Tari Mandau dari suku Dayak, lalu Made memperkenalkan tarian dari daerah asalnya di Bali: Tari Pendet, Tari Kecak, dan Tari Barong.',
  },
  {
    nomor: 6,
    judul: 'Kerukunan Beragama & Bhinneka Tunggal Ika',
    asalDaerah: 'Negara Kesatuan Republik Indonesia',
    percakapan: [
      {
        penutur: 'Dani',
        teks: '“Di daerah asal Made, agama mayoritasnya Hindu. Meski ada juga yang memeluk agama Kristen dan Islam. Mereka semua rukun.”',
      },
      {
        penutur: 'Made',
        teks: '“Negara Kesatuan Republik Indonesia memiliki semboyan Bhinneka Tunggal Ika, Dani. Meski berbeda, tetap satu Nusa dan Bangsa.”',
      },
      {
        penutur: 'Made, Dani, & Dewi',
        teks: '“Kita Indonesia”',
      },
    ],
    catatanAlur:
      'Dani menceritakan kerukunan antarumat beragama di daerah asal Made, Made menegaskan makna semboyan Bhinneka Tunggal Ika, dan ketiganya berseru kompak: Kita Indonesia!',
  },
];

export const RINGKASAN_KOMIK: string[] = [
  'Baju Ning berasal dari Jawa Timur',
  'Pakaian adat suku Bugis berasal dari Sulawesi Tengah',
  'Tari Mandau adalah tarian suku Dayak dari Kalimantan Tengah',
  'Dari Bali ada Tari Pendet, Tari Kecak, dan Tari Barong',
  'Meskipun berbeda suku, agama, dan budaya, kita tetap rukun karena Bhinneka Tunggal Ika',
];

export const PERTANYAAN_REFLEKSI = [
  {
    key: 'jawab1' as const,
    nomor: '01',
    pertanyaan:
      'Bagaimana cara kamu mengenali identitas masyarakat di lingkungan tempat tinggalmu?',
    petunjuk:
      'Contoh: Melalui bahasa daerah yang digunakan saat menyapa, pakaian adat saat acara, makanan khas, atau kebiasaan gotong royong.',
  },
  {
    key: 'jawab2' as const,
    nomor: '02',
    pertanyaan:
      'Apakah kamu memiliki tetangga yang berbeda suku, budaya, serta agama dan kepercayaan? Jelaskan apa suku, agama dan kepercayaan, serta budayanya!',
    petunjuk:
      'Ceritakan tetangga atau teman di sekitar rumahmu beserta tradisi unik yang pernah kamu lihat.',
  },
  {
    key: 'jawab3' as const,
    nomor: '03',
    pertanyaan:
      'Menurutmu, seperti apa adat istiadat dan budaya salah satu tokoh yang ada dalam komik tersebut?',
    petunjuk:
      'Pilih salah satu tokoh dalam komik (Dewi, Dani, atau Made) dan jelaskan adat istiadat serta budaya daerahnya.',
  },
];

export const DATA_SUKU: SukuItem[] = [
  {
    id: 'betawi',
    nama: 'Betawi',
    provinsi: 'Jakarta',
    wilayah: 'Jawa',
    warnaHex: '#DC2626',
    image: budayaBetawiImg,
    pakaianPria:
      'Baju Sadariah (baju koko longgar berwarna terang, celana panjang batik/komprang, kain sarung di bahu, dan peci).',
    pakaianWanita:
      'Kebaya Encim (kebaya semi transparan bermotif bunga dengan warna pastel dipadukan kain batik Betawi).',
    pakaianRingkas:
      'Pria: Baju Sadariah (baju koko longgar berwarna terang, celana panjang, peci)\nWanita: Kebaya Encim (kebaya semi transparan bermotif bunga, warna pastel + kain batik Betawi)',
    kuliner: 'Kerak Telor (nasi ketan + telur + ebi + bawang goreng yang dimasak di atas tungku arang).',
    budaya: 'Ondel-ondel (boneka raksasa berpasangan yang meriah untuk mengiringi pawai budaya dan pesta rakyat).',
    fakta: 'Ondel-ondel dulu dipercaya oleh leluhur masyarakat Betawi dapat menjaga kampung dan mengusir roh jahat!',
  },
  {
    id: 'bugis-makassar',
    nama: 'Bugis/Makassar',
    provinsi: 'Sulawesi Selatan',
    wilayah: 'Sulawesi',
    warnaHex: '#D97706',
    image: budayaBugisImg,
    pakaianPria:
      'Jas Tutu (jas kerah tertutup berlengan panjang dengan kancing keemasan) dipadukan dengan Songkok Recca dari serat lontar.',
    pakaianWanita:
      'Baju Bodo (baju lengan pendek berbentuk segi empat, sangat longgar, berwarna cerah dengan sarung sutra Lipa Sabbe).',
    pakaianRingkas:
      'Wanita: Baju Bodo (baju lengan pendek kotak, sangat longgar, warna cerah)\nPria: Jas Tutu + Songkok Recca',
    kuliner: 'Coto Makassar (sup daging sapi + jeroan dengan kuah kacang berempah kental, disajikan bersama ketupat).',
    budaya: 'Baju Bodo adalah salah satu pakaian adat tertua di Indonesia sekaligus warisan tenun sutra Nusantara.',
    fakta: 'Baju Bodo sudah dikenal dan dikenakan masyarakat Sulawesi Selatan sejak abad ke-9!',
  },
  {
    id: 'melayu-riau',
    nama: 'Melayu Riau',
    provinsi: 'Riau',
    wilayah: 'Sumatra',
    warnaHex: '#059669',
    image: budayaMelayuRiauImg,
    pakaianPria:
      'Baju Kurung Cekak Musang (berkerah tinggi rapi dilengkapi kain samping tenun songket dan kopiah).',
    pakaianWanita:
      'Kebaya Laboh (kebaya panjang hingga bawah lutut yang sopan dan anggun dipadukan kain tenun Melayu).',
    pakaianRingkas:
      'Pria: Baju Kurung Cekak Musang (leher tinggi)\nWanita: Kebaya Laboh',
    kuliner: 'Makanan khas Melayu seperti gulai ikan patin, asam pedas ikan sungai, dan bolu kemojo.',
    budaya: 'Peninggalan sejarah Candi Muara Takus & kemegahan arsitektur Istana Siak Sri Indrapura.',
    fakta: 'Masyarakat Melayu sangat menjunjung tinggi adat resam (tata krama, pantun, dan kesantunan bertutur kata).',
  },
  {
    id: 'rote',
    nama: 'Rote',
    provinsi: 'Nusa Tenggara Timur',
    wilayah: 'Kepulauan Sunda Kecil',
    warnaHex: '#92400E',
    image: budayaRoteImg,
    pakaianRingkas:
      "Kain tenun ikat Rote (motif geometris khas)\nTopi Ti'i Langga (anyaman daun lontar dengan cula unik di bagian depan)",
    kuliner: 'Makanan khas NTT berbahan pangan lokal seperti jagung bose, ubi, dan olahan nira lontar.',
    budaya: 'Alat musik Sasando (alat musik petik tradisional berdawai dengan tabung resonansi dari daun lontar).',
    fakta: "Topi Ti'i Langga dari daun lontar menjadi identitas kuat masyarakat Rote yang melambangkan kewibawaan.",
  },
  {
    id: 'ambon',
    nama: 'Ambon',
    provinsi: 'Maluku',
    wilayah: 'Kepulauan Maluku',
    warnaHex: '#0284C7',
    image: budayaAmbonImg,
    pakaianRingkas:
      'Baju Cele (busana adat bermotif kotak-kotak kecil berwarna merah-putih cerah yang melambangkan semangat dan keceriaan).',
    kuliner: 'Ikan bakar segar & Papeda (bubur sagu kenyal disajikan dengan ikan kuah kuning kaya rempah khas Maluku).',
    budaya: 'Alat musik tabuh Tifa & Tari Cakalele (tarian perang tradisional yang penuh semangat kepahlawanan).',
    fakta: 'Alat musik Tifa sering dimainkan untuk mengiringi upacara adat, penyambutan tamu, dan pesta rakyat.',
  },
];

export const KUIS_MATCHING: MatchingQuizItem[] = [
  { item: 'Ondel-ondel / Kerak Telor', benar: 'Budaya & kuliner khas Betawi (Jakarta)' },
  { item: 'Baju Bodo', benar: 'Pakaian adat wanita Bugis yang longgar dan berwarna cerah' },
  { item: "Topi Ti'i Langga", benar: 'Topi dari daun lontar khas suku Rote' },
  { item: 'Coto Makassar', benar: 'Sup daging khas Makassar (Sulawesi Selatan)' },
  { item: 'Baju Cele', benar: 'Pakaian adat bermotif kotak-kotak khas Ambon' },
  { item: 'Tari Cakalele', benar: 'Tarian perang khas Maluku' },
  { item: 'Candi Muara Takus', benar: 'Candi kuno yang berada di Riau' },
  { item: 'Baju Sadariah & Kebaya Encim', benar: 'Pakaian adat suku Betawi' },
];

export const KUIS_PG: MultipleChoiceQuizItem[] = [
  {
    id: 1,
    q: 'Semboyan yang berarti “Berbeda-beda tetapi tetap satu” adalah…',
    options: ['Garuda Pancasila', 'Bhinneka Tunggal Ika', 'Indonesia Raya', 'Merah Putih'],
    answer: 1,
    pembahasan: 'Bhinneka Tunggal Ika berasal dari bahasa Jawa Kuno yang berarti berbeda-beda tetapi tetap satu jua.',
  },
  {
    id: 2,
    q: 'Pakaian adat wanita Betawi disebut…',
    options: ['Baju Bodo', 'Kebaya Encim', 'Baju Cele', 'Kebaya Laboh'],
    answer: 1,
    pembahasan: 'Wanita Betawi mengenakan Kebaya Encim bermotif bunga warna pastel yang dipadukan kain batik Betawi.',
  },
  {
    id: 3,
    q: 'Coto Makassar adalah makanan khas dari…',
    options: ['Jakarta', 'Riau', 'Sulawesi Selatan', 'Maluku'],
    answer: 2,
    pembahasan: 'Coto Makassar merupakan sup daging berkuah kacang rempah kental khas Makassar, Sulawesi Selatan.',
  },
  {
    id: 4,
    q: 'Topi Ti’i Langga terbuat dari…',
    options: ['Rotan', 'Daun lontar', 'Kayu', 'Kain batik'],
    answer: 1,
    pembahasan: "Topi Ti'i Langga khas suku Rote dianyam dengan terampil dari daun pohon lontar.",
  },
  {
    id: 5,
    q: 'Tari Cakalele berasal dari daerah…',
    options: ['Bali', 'Kalimantan', 'Maluku', 'Jawa Timur'],
    answer: 2,
    pembahasan: 'Tari Cakalele adalah tarian perang tradisional penuh semangat yang berasal dari Maluku.',
  },
  {
    id: 6,
    q: 'Baju Bodo adalah pakaian adat dari suku…',
    options: ['Betawi', 'Bugis', 'Melayu', 'Ambon'],
    answer: 1,
    pembahasan: 'Baju Bodo merupakan salah satu busana adat tertua di Indonesia yang berasal dari suku Bugis.',
  },
  {
    id: 7,
    q: 'Candi Muara Takus terletak di provinsi…',
    options: ['Jawa Timur', 'Riau', 'NTT', 'Maluku'],
    answer: 1,
    pembahasan: 'Candi Muara Takus adalah situs candi bercorak Buddha kuno yang terletak di Kabupaten Kampar, Riau.',
  },
  {
    id: 8,
    q: 'Alat musik Tifa berasal dari…',
    options: ['Rote', 'Ambon (Maluku)', 'Bugis', 'Betawi'],
    answer: 1,
    pembahasan: 'Tifa adalah alat musik pukul tradisional khas Ambon (Maluku) serta Papua.',
  },
  {
    id: 9,
    q: 'Nilai utama yang diajarkan dalam komik “Kita Indonesia” adalah…',
    options: ['Kompetisi', 'Toleransi dan persatuan', 'Individualisme', 'Persaingan'],
    answer: 1,
    pembahasan: 'Komik Kita Indonesia mengajarkan sikap saling menghargai, toleransi, dan persatuan di tengah keberagaman.',
  },
  {
    id: 10,
    q: 'Pakaian adat pria Betawi disebut…',
    options: ['Jas Tutu', 'Baju Sadariah', 'Baju Cele', 'Baju Kurung'],
    answer: 1,
    pembahasan: 'Pria Betawi mengenakan Baju Sadariah (baju koko longgar warna terang) lengkap dengan peci dan kain sarung.',
  },
];
