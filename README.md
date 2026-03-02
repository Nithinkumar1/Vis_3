# Homework #5: Custom Visualization Design

In this homework, you will create a custom visualization as part of a museum exhibit, that is considered either "modded," "combinatorial," or "novel," according to the classifications laid out in the [Elijah Meek&#39;s article](https://medium.com/@Elijah_Meeks/defining-custom-data-visualization-c20a64746d08). **This assignment is worth 10 points.**

The audience for this visualization exhibit is visitors to a musuem. The goal is to create a visually interesting and informative visualization graphic/infographic exhibit that communicates (some or all of) your chosen dataset effectively and in a creative and engaging manner to the museum visitors.

> ❗️ As always, the use of ChatGPT, IDE co-pilots, or other forms of Generative AI are not allowed in this class. Any usage may result in an academic integrity violation.

There are five datasets available for this homework (choose one).

* Near Earth Comets ([source](https://www.kaggle.com/datasets/nasa/near-earth-comets))
* Minecraft Blocks, Items, Mobs, Biomes, etc ([source](https://www.kaggle.com/datasets/madelinee/minecraft-blocks-items-mobs-biomes-etc))
  * This link contains several datasets, including flora, mobs, food, block types, and more. It's okay to just pick one CSV file if you'd like, assuming it has the required number of points and dimensions.
* Top Influencers Crushing On Instagram ([source](https://www.kaggle.com/datasets/whenamancodes/top-200-influencers-crushing-on-instagram))
* Dinosaurs ([source](https://www.kaggle.com/datasets/smruthiiii/dinosaur-dataset))
* Art Prices ([source](https://www.kaggle.com/datasets/flkuhm/art-price-dataset))
  * Use the artDataset.csv file if you choose this dataset. There is a corresponding artDataset folder that contains images of these data points, but if you wish to include images from that as part of your homework, please do not make your submission repository bigger than 10-15 MB.

## Requirements

* Create a page `index.html` in this repostory for storing your visualization exhibit. You'll also want to include your chosen dataset in your submitted repository.
  * You are allowed to modify/transform the base dataset as well. If you do this, you only need to submit the dataset files used in your submission (you don't have to submit the raw/original data files).
* Create a unique, custom, D3-based visualization graphic (or infographic) that is not simply an existing technique or D3 block.
  * Your visualization should be a "Custom" viusalization, as defined by the [Defining Custom Data Visualization](https://medium.com/@Elijah_Meeks/defining-custom-data-visualization-c20a64746d08) article and our corresponding lecture. In other words, it should be either a "modded," "combinatorial," or "novel" graphic.
  * You may import existing code, but you must document exactly what modifications you make in your writeup, and you should _substantially_ change any imported code that you build upon. If you're unsure what constitutes substantial, talk to the TA.
  * You may NOT re-use one of the innovative charts from your project.
  * You have to use D3 v7.
* You must visualize at least three different attributes in your museum exhibit.
  * If you choose to represent the data spatially (e.g., using the lat/long coordinates in the data files, or if you create lat/long coordinates as a derived attribute), this counts as one attribute, so you need at least two more attributes in your exhibit.
* You are not required to visualize _all_ of the given data. You may focus on a specific topic or question that you want to address, and therefore you might only need to look at a subset of the data (attributes or items) to answer it. If you only want to visualize a subset of the dataset, you must include at least 30 data points (and these must be chosen in a way that helps to support your museum exhibit's story).
* You can reference the "Custom Visualization" lecture for some inspiration ideas. Another approach for creating a unique visualization is to create custom glyphs. Here are some more examples that can provide inspiration.
  * [lalettura](http://giorgialupi.com/lalettura)
  * [film flowers](http://sxywu.com/filmflowers/)
  * [Visualizing Painter&#39;s Lives](http://giorgialupi.com/visualizing-painters-lives)
  * [How&#39;s life?](http://www.oecdbetterlifeindex.org/#/31111111111)
  * [Where the Wild Bees Are](https://www.scientificamerican.com/article/where-the-wild-bees-are/)
  * [Giorgia Lupi and Stefanie Posavec’s Life Data Visualizations](https://www.moma.org/magazine/articles/309)
* You may choose to create either a static, animating, interactive exhibit.
* Above or below your chart on your exhibit page, have a title and include a short description that explains your design (marks, channels, interactions). Below that description, state which category of "Custom Visualization" your submission falls into (either modded, combinatorial, or novel), and explain why it does.
  * Alternatively, you can make this information togglable on the page - in such case, it should be obvious to the grader how to show this information.
* If you created your visualization by modified an existing D3 block or example, also provide a link to the original source code and describe (in detail) how you modified it to create your chart.
  * Keep in mind, something like "two non-custom charts linked together" or "showing a second chart as a tooltip on top of a chart" is not custom in and of itself. The chart design itself must show customization.
* When you finish your 'exhibit', take a screenshot of your page and name it `asurite.png` after your ASURITE. (For example, mine would be `cbryan16.png`.) Include this png file in the base folder of your submission.

You are free (and encouraged!) to be creative on this assignment, including the use of abstract, artistic, thematic, esoteric, evocative, atmospheric, and illustrative designs. Don't submit just a basic D3 block (bar chart, scatterplot, pie/donut chart, line chart, node-link diagram, tree, etc.), or you'll receive a 0 (or significant deduction)on this assignment. Especially creative or interesting submissions are eligible for up to 2 points extra credit.
