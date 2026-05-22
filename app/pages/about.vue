<script setup lang="ts">
const companions = [
    {
        l: "https://github.com/Coldknife2/JourneySaveParserHtml",
        n: "Coldknife2",
        s: 0xf114,
    },
    { l: "https://github.com/Peksa", n: "Peksa", s: 0xf103 },
    { l: "https://www.twitch.tv/lbanj", n: "Banj", s: 0xf112 },
    {
        l: "https://github.com/arckoor/JourneySaveParserHtml",
        n: "arckoor",
        s: 0xf101,
    },
    { l: "https://www.twitch.tv/lovelyflight", n: "Lovely Flight", s: 0xf111 },
    {
        l: "https://www.youtube.com/channel/UCEPMlDvuIcrHHGaEeakKkZA/featured",
        n: "Paleologos",
        s: 0xf101,
    },
    { l: "https://www.twitch.tv/nathanj29", n: "nathanj", s: 0xf110 },
    { l: "https://www.twitch.tv/avalo_ki", n: "aravshetikolava", s: 0xf10b },
];
</script>

<template>
    <ParserDisplay
        :companions="companions"
        heading-name="Contributors"
        :slice-position="Math.ceil(companions.length / 2)"
    />
</template>
