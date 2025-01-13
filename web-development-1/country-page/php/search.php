<?php

if (!isset($_POST['search'])) {
    header('Location: ../index.html');
}

$query = htmlspecialchars(stripcslashes($_POST['search']));

?>

  <main class="flex flex-col">
    <section class="flex px-4 items-center justify-center text-center">
        <p class="font-weight-400 p-1">Your search for "<?= $query ?>" returned 0 results.</p>
    </section>
  </main>